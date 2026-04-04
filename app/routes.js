const express = require("express");
const cookieParser = require("cookie-parser");

const users = require("./data.json");

const getUserById = (userId) => {
  return users.find((user) => user.id === userId);
};

const router = express.Router();
router.use(cookieParser());

const { authenticateToken, generateToken, loginRateLimiter } = require("./middleware");

/**
 * POST /api/login ✅
 * Returns a token for the user (set as httpOnly cookie)
 */
router.post("/api/login", loginRateLimiter, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: "/",
  });

  return res.json({
    userId: user.id,
  });
});

/**
 * POST /api/logout
 * Clears the httpOnly cookie
 */
router.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res.json({ message: "Logged out" });
});

/** ✅
 * GET /api/user-info
 * Returns user information including profile, goals, and statistics
 */
router.get("/api/user-info", authenticateToken, (req, res) => {
  const user = getUserById(req.user.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const runningData = user.runningData;

  // Calculate overall statistics
  const totalDistance = runningData.reduce(
    (sum, session) => sum + session.distance,
    0
  ).toFixed(1);
  const totalSessions = runningData.length;
  const totalDuration = runningData.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const totalCalories = runningData.reduce(
    (sum, session) => sum + session.caloriesBurned,
    0
  );

  // Extract user profile information
  const userProfile = {
    firstName: user.userInfos.firstName,
    lastName: user.userInfos.lastName,
    createdAt: user.userInfos.createdAt,
    age: user.userInfos.age,
    gender: user.userInfos.gender,
    weight: user.userInfos.weight,
    height: user.userInfos.height,
    profilePicture: user.userInfos.profilePicture,
  };

  return res.json({
    profile: userProfile,
    statistics: {
      totalDistance,
      totalSessions,
      totalDuration,
      totalCalories,
    },
  });
});

/**
 * GET /api/user-activity
 * Returns running sessions between startWeek and endWeek
 */
router.get("/api/user-activity", authenticateToken, (req, res) => {
  const { startWeek, endWeek } = req.query;

  if (!startWeek || !endWeek) {
    return res.status(400).json({ message: "startWeek and endWeek are required" });
  }

  const user = getUserById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const runningData = user.runningData;

  // Convert week strings to Date objects
  const startDate = new Date(startWeek);
  const endDate = new Date(endWeek);
  const now = new Date();

  // Filter sessions between startWeek and endWeek, excluding future dates
  const filteredSessions = runningData.filter((session) => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startDate && sessionDate <= endDate && sessionDate <= now;
  });

  // Sort by date ascending
  const sortedSessions = filteredSessions.sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  return res.json(sortedSessions);
});

module.exports = router;
