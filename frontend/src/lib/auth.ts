import { cookies } from 'next/headers'

export const setToken = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export const getToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value
}

export const removeToken = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}