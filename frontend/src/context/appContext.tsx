'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthUser {
  userId: string
}

interface AppContextType {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  isAuthenticated: boolean
  sessionLoading: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [sessionLoading, setSessionLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/me`, { credentials: 'include' })
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then((data) => {
        if (data?.userId) setUser({ userId: data.userId })
      })
      .catch(() => {})
      .finally(() => setSessionLoading(false))
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated: !!user, sessionLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
