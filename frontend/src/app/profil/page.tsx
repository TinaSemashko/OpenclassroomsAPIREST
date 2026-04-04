'use client'

import { Box, CircularProgress } from '@mui/material'
import useUserData from '@/lib/useUserData'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import {
  PageWrapper,
  Content,
  LeftColumn,
  ProfileCard,
  AvatarWrapper,
  ProfileAvatar,
  ProfileName,
  ProfileSince,
  InfoCard,
  InfoTitle,
  InfoRow,
  RightColumn,
  SectionTitle,
  SectionSubtitle,
  StatsGrid,
  StatCard,
  StatCardLabel,
  StatCardValue,
  StatCardUnit,
} from './page.styled'

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const formatDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return { hours, minutes }
}

const formatGender = (gender: string) => {
  const map: Record<string, string> = {
    female: 'Femme',
    male: 'Homme',
  }
  return map[gender] || gender
}

const formatHeight = (cm: number) => {
  const m = Math.floor(cm / 100)
  const rest = cm % 100
  return `${m}m${rest.toString().padStart(2, '0')}`
}

const ProfilPage = () => {
  const { profile, stats, monthSessions, loading } = useUserData()

  if (loading || !profile || !stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  const { hours, minutes } = formatDuration(stats.totalDuration)

  // Nombre de jours de repos : jours uniques sans session dans les 30 derniers jours
  const uniqueSessionDays = new Set(
    monthSessions.map((s) => s.date.split('T')[0]),
  )
  const restDays = 30 - uniqueSessionDays.size

  return (
    <PageWrapper>
      <Navbar />
      <Content>
        <LeftColumn>
          <ProfileCard>
            <AvatarWrapper>
              <ProfileAvatar
                src={profile.profilePicture}
                alt={`${profile.firstName} ${profile.lastName}`}
              />
            </AvatarWrapper>
            <div>
              <ProfileName>
                {profile.firstName} {profile.lastName}
              </ProfileName>
              <ProfileSince>
                Membre depuis le {formatDate(profile.createdAt)}
              </ProfileSince>
            </div>
          </ProfileCard>

          <InfoCard>
            <InfoTitle>Votre profil</InfoTitle>
            <InfoRow>Âge : {profile.age}</InfoRow>
            <InfoRow>Genre : {formatGender(profile.gender)}</InfoRow>
            <InfoRow>Taille : {formatHeight(profile.height)}</InfoRow>
            <InfoRow>Poids : {profile.weight}kg</InfoRow>
          </InfoCard>
        </LeftColumn>

        <RightColumn>
          <SectionTitle>Vos statistiques</SectionTitle>
          <SectionSubtitle>
            depuis le {formatDate(profile.createdAt)}
          </SectionSubtitle>

          <StatsGrid>
            <StatCard>
              <StatCardLabel>Temps total couru</StatCardLabel>
              <StatCardValue>{hours}h</StatCardValue>
              <StatCardUnit>{minutes}min</StatCardUnit>
            </StatCard>

            <StatCard>
              <StatCardLabel>Calories brûlées</StatCardLabel>
              <StatCardValue>{stats.totalCalories}</StatCardValue>
              <StatCardUnit>cal</StatCardUnit>
            </StatCard>

            <StatCard>
              <StatCardLabel>Distance totale parcourue</StatCardLabel>
              <StatCardValue>{stats.totalDistance}</StatCardValue>
              <StatCardUnit>km</StatCardUnit>
            </StatCard>

            <StatCard>
              <StatCardLabel>Nombre de jours de repos</StatCardLabel>
              <StatCardValue>{restDays}</StatCardValue>
              <StatCardUnit>jours</StatCardUnit>
            </StatCard>

            <StatCard>
              <StatCardLabel>Nombre de sessions</StatCardLabel>
              <StatCardValue>{stats.totalSessions}</StatCardValue>
              <StatCardUnit>sessions</StatCardUnit>
            </StatCard>
          </StatsGrid>
        </RightColumn>
      </Content>
      <Footer />
    </PageWrapper>
  )
}

export default ProfilPage
