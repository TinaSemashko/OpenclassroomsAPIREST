'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Typography } from '@mui/material'
import { useAppContext } from '@/context/appContext'
import {
  PageWrapper,
  LeftPanel,
  RightPanel,
  HeroImage,
  FormCard,
  Logo,
  Title,
  StyledTextField,
  SubmitButton,
  ForgotLink,
} from './page.styled'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useAppContext()
  const router = useRouter()

  const handleSubmit = async () => {
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

  return (
    <PageWrapper>
      <LeftPanel>
        <Logo>⬛ SPORTSEE</Logo>
        <FormCard>
          <Title>Transformez vos stats en résultats</Title>
          <Typography variant="h6" sx={{ mb: 3 }}>Se connecter</Typography>
          <StyledTextField
            fullWidth
            label="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>
          )}
          <SubmitButton fullWidth onClick={handleSubmit}>
            Se connecter
          </SubmitButton>
          <ForgotLink variant="body2">Mot de passe oublié ?</ForgotLink>
        </FormCard>
      </LeftPanel>
      <RightPanel>
        <HeroImage src="/hero.png" alt="runners" />
      </RightPanel>
    </PageWrapper>
  )
}

export default LoginPage