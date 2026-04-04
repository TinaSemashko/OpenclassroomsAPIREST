'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/appContext'

export interface UserProfile {
  firstName: string
  lastName: string
  createdAt: string
  age: number
  gender: string
  weight: number
  height: number
  profilePicture: string
}

export interface UserStats {
  totalDistance: string
  totalSessions: number
  totalDuration: number
  totalCalories: number
}

export interface RunningSession {
  date: string
  distance: number
  duration: number
  heartRate: { min: number; max: number; average: number }
  caloriesBurned: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const getMonday = (date: Date) => {
  const d = new Date(date)
  const dayOfWeek = d.getDay()
  d.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  d.setHours(0, 0, 0, 0)
  return d
}

const formatISO = (date: Date) => date.toISOString().split('T')[0]

const useUserData = () => {
  const { user } = useAppContext()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [allSessions, setAllSessions] = useState<RunningSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.replace('/login')
      return
    }

    const fetchData = async () => {
      const fetchOptions: RequestInit = { credentials: 'include' }

      // Dates de référence : tout l'historique → dimanche courant
      const monday = getMonday(new Date())
      const historyStart = new Date('2024-01-01')
      const sunday = new Date(monday)
      sunday.setDate(monday.getDate() + 6)

      const [infoRes, activityRes] = await Promise.all([
        fetch(`${API_URL}/api/user-info`, fetchOptions),
        fetch(
          `${API_URL}/api/user-activity?startWeek=${formatISO(historyStart)}&endWeek=${formatISO(sunday)}`,
          fetchOptions
        ),
      ])

      if (!infoRes.ok) throw new Error('Erreur lors du chargement du profil')
      if (!activityRes.ok) throw new Error('Erreur lors du chargement des activités')

      const infoData = await infoRes.json()
      const activityData = await activityRes.json()

      setProfile(infoData.profile)
      setStats(infoData.statistics)
      setAllSessions(activityData)
    }

    fetchData()
      .catch(() => setError('Impossible de charger les données. Vérifiez que le serveur est lancé.'))
      .finally(() => setLoading(false))
  }, [user, router])

  // Semaine courante = filtrée depuis allSessions
  const currentWeekStart = formatISO(getMonday(new Date()))
  const sessions = allSessions.filter((s) => s.date >= currentWeekStart)

  return { profile, stats, sessions, monthSessions: allSessions, loading, error }
}

export default useUserData
