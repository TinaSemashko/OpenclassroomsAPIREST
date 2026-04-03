'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/appContext'

const useAuth = () => {
  const { setUser } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState('')

  const login = async (username: string, password: string) => {
    setError('')
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Erreur de connexion')
        return
      }
      setUser({ userId: data.userId, token: data.token })
      router.push('/dashboard')
    } catch {
      setError('Erreur serveur, veuillez réessayer')
    }
  }

  const logout = () => {
    document.cookie = 'token=; path=/; max-age=0'
    setUser(null)
    router.push('/login')
  }

  return { login, logout, error }
}

export default useAuth
