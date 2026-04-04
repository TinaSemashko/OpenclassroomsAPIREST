'use client'

import { useState } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import useAuth from '@/lib/useAuth'
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
  const { login, error, loading } = useAuth()

  const handleSubmit = () => {
    login(username, password)
  }

  return (
    <PageWrapper>
      <LeftPanel>
        <Logo>SPORTSEE</Logo>
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
          <SubmitButton fullWidth onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Se connecter'}
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
