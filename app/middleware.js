const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  console.error("JWT_SECRET is not set in environment variables");
  process.exit(1);
}

const handleNoUserData = (res, userData) => {
  if (!userData) {
    res.statusCode = 404;
    return res.json("can not get user");
  }

  return res.json({ data: userData });
};

const authenticateToken = (req, res, next) => {
  // Read token from httpOnly cookie first, then fallback to Authorization header
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers["authorization"];
  const headerToken = authHeader && authHeader.split(" ")[1];
  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "24h" });
};

// Simple in-memory rate limiter for login
const loginAttempts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10;

const loginRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, []);
  }

  const attempts = loginAttempts.get(ip).filter((t) => now - t < RATE_LIMIT_WINDOW);
  loginAttempts.set(ip, attempts);

  if (attempts.length >= MAX_ATTEMPTS) {
    return res.status(429).json({
      message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
    });
  }

  attempts.push(now);
  next();
};

module.exports = {
  handleNoUserData,
  authenticateToken,
  generateToken,
  loginRateLimiter,
};
