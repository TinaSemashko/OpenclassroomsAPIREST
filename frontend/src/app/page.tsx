'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Box, CircularProgress } from '@mui/material'
import { useAppContext } from '@/context/appContext'
import LogoIcon from '@/components/Navbar/LogoIcon'
import {
  PageWrapper,
  LeftPanel,
  RightPanel,
  HeroImage,
  LogoRow,
  Logo,
  Title,
  Subtitle,
  LoginButton,
} from './page.styled'

const Home = () => {
  const { isAuthenticated, sessionLoading } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (!sessionLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [sessionLoading, isAuthenticated, router])

  if (sessionLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) return null

  return (
    <PageWrapper>
      <LeftPanel>
        <LogoRow>
          <LogoIcon />
          <Logo>SPORTSEE</Logo>
        </LogoRow>
        <Title>Transformez vos stats en résultats</Title>
        <Subtitle>
          Suivez vos performances, analysez vos progrès et atteignez vos
          objectifs sportifs.
        </Subtitle>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <LoginButton>Accéder au tableau de bord</LoginButton>
        </Link>
      </LeftPanel>
      <RightPanel>
        <HeroImage src="/hero.png" alt="runners" />
      </RightPanel>
    </PageWrapper>
  )
}

export default Home
