'use client'

import { useEffect, useState } from 'react'
import { useAppContext } from '@/context/appContext'

export interface UserProfile {
  firstName: string
  lastName: string
  createdAt: string
  age: number
  weight: number
  height: number
  profilePicture: string
}

export interface UserStats {
  totalDistance: string
  totalSessions: number
  totalDuration: number
}

export interface RunningSession {
  date: string
  distance: number
  duration: number
  heartRate: { min: number; max: number; average: number }
  caloriesBurned: number
}

const useUserData = () => {
  const { user } = useAppContext()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [sessions, setSessions] = useState<RunningSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.token) return

    const fetchUserInfo = async () => {
      const res = await fetch('http://localhost:8000/api/user-info', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const data = await res.json()
      setProfile(data.profile)
      setStats(data.statistics)
    }

    const fetchActivity = async () => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const monday = new Date(now)
      monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
      const sunday = new Date(monday)
      sunday.setDate(monday.getDate() + 6)

      const startWeek = monday.toISOString().split('T')[0]
      const endWeek = sunday.toISOString().split('T')[0]

      const res = await fetch(
        `http://localhost:8000/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      const data = await res.json()
      setSessions(data)
    }

    Promise.all([fetchUserInfo(), fetchActivity()]).then(() => {
      setLoading(false)
    })
  }, [user?.token])

  return { profile, stats, sessions, loading }
}

export default useUserData
