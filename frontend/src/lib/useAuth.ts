'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/appContext'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const useAuth = () => {
  const { setUser } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (username: string, password: string) => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Erreur de connexion')
        return
      }
      setUser({ userId: data.userId })
      router.push('/dashboard')
    } catch {
      setError('Erreur serveur, veuillez réessayer')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // continue logout even if request fails
    }
    setUser(null)
    router.push('/login')
  }

  return { login, logout, error, loading }
}

export default useAuth
