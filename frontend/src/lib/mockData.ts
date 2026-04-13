// Mock data matching the backend API response shape.
// Used during initial development before connecting to the Express backend,
// and as a fallback reference for the expected data structure.
//
// Endpoints mocked:
//  - GET /api/user-info     -> { profile, statistics }
//  - GET /api/user-activity -> RunningSession[]

import type { UserProfile, UserStats, RunningSession } from './useUserData'

export const mockProfile: UserProfile = {
  firstName: 'Alice',
  lastName: 'Martin',
  createdAt: '2024-01-15',
  age: 29,
  gender: 'female',
  weight: 62,
  height: 168,
  profilePicture: '/images/avatar-default.png',
}

export const mockStats: UserStats = {
  totalDistance: '142.5',
  totalSessions: 24,
  totalDuration: 18420, // in seconds
  totalCalories: 14280,
}

export const mockSessions: RunningSession[] = [
  {
    date: '2026-04-07',
    distance: 5.2,
    duration: 1820,
    heartRate: { min: 110, max: 168, average: 142 },
    caloriesBurned: 410,
  },
  {
    date: '2026-04-09',
    distance: 7.8,
    duration: 2640,
    heartRate: { min: 115, max: 175, average: 148 },
    caloriesBurned: 620,
  },
  {
    date: '2026-04-11',
    distance: 4.3,
    duration: 1510,
    heartRate: { min: 108, max: 160, average: 138 },
    caloriesBurned: 340,
  },
  {
    date: '2026-04-12',
    distance: 10.1,
    duration: 3380,
    heartRate: { min: 118, max: 182, average: 152 },
    caloriesBurned: 810,
  },
  {
    date: '2026-03-28',
    distance: 6.0,
    duration: 2100,
    heartRate: { min: 112, max: 170, average: 144 },
    caloriesBurned: 475,
  },
  {
    date: '2026-03-22',
    distance: 8.5,
    duration: 2890,
    heartRate: { min: 116, max: 178, average: 150 },
    caloriesBurned: 680,
  },
]

// Mimics the shape of GET /api/user-info
export const mockUserInfoResponse = {
  profile: mockProfile,
  statistics: mockStats,
}

// Mimics the shape of GET /api/user-activity (an array of sessions)
export const mockUserActivityResponse = mockSessions
