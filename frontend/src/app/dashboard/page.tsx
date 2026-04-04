'use client'

import { Box, CircularProgress } from '@mui/material'
import useUserData from '@/lib/useUserData'
import Navbar from '@/components/Navbar/Navbar'
import WeeklyDistanceChart from '@/components/WeeklyDistanceChart/WeeklyDistanceChart'
import BpmChart from '@/components/BpmChart/BpmChart'
import SessionGoalChart from '@/components/SessionGoalChart/SessionGoalChart'
import Footer from '@/components/Footer/Footer'
import {
  PageWrapper,
  Content,
  Banner,
  BannerText,
  BannerButton,
  ProfileCard,
  AvatarWrapper,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileSince,
  DistanceBadge,
  DistanceLabel,
  DistanceValue,
  SectionTitle,
  SectionSubtitle,
  ChartsRow,
  ChartCard,
  WeekRow,
  WeekCard,
  WeekStatsColumn,
  StatCard,
  StatLabel,
  StatValue,
  StatUnit,
} from './page.styled'

const DashboardPage = () => {
  const { profile, stats, sessions, monthSessions, loading } = useUserData()

  const weekDistance = sessions
    .reduce((sum, s) => sum + s.distance, 0)
    .toFixed(1)
  const weekDuration = sessions.reduce((sum, s) => sum + s.duration, 0)
  const weekSessions = sessions.length

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const getMonday = (d: Date) => {
    const date = new Date(d)
    const day = date.getDay()
    date.setDate(date.getDate() - (day === 0 ? 6 : day - 1))
    return date
  }
  const monday = getMonday(new Date())
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const formatShort = (d: Date) =>
    d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })

  if (loading || !profile || !stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <PageWrapper>
      <Navbar />
      <Content>
        {/* ---- Banniere Coach AI ---- */}
        <Banner>
          <BannerText>
            Posez vos questions sur votre programme, vos performances ou vos
            objectifs.
          </BannerText>
          <BannerButton>Lancer une conversation</BannerButton>
        </Banner>

        {/* ---- Carte profil ---- */}
        <ProfileCard>
          <AvatarWrapper>
            <ProfileAvatar
              src={profile.profilePicture}
              alt={`${profile.firstName} ${profile.lastName}`}
            />
          </AvatarWrapper>
          <ProfileInfo>
            <ProfileName>
              {profile.firstName} {profile.lastName}
            </ProfileName>
            <ProfileSince>
              Membre depuis le {formatDate(profile.createdAt)}
            </ProfileSince>
          </ProfileInfo>
          <DistanceBadge>
            <DistanceLabel>Distance totale parcourue</DistanceLabel>
            <DistanceValue>{stats.totalDistance} km</DistanceValue>
          </DistanceBadge>
        </ProfileCard>

        {/* ---- Vos dernières performances ---- */}
        <SectionTitle>Vos dernières performances</SectionTitle>
        <ChartsRow>
          <ChartCard>
            <WeeklyDistanceChart sessions={monthSessions} />
          </ChartCard>
          <ChartCard>
            <BpmChart sessions={monthSessions} />
          </ChartCard>
        </ChartsRow>

        {/* ---- Cette semaine ---- */}
        <SectionTitle>Cette semaine</SectionTitle>
        <SectionSubtitle>
          Du {formatShort(monday)} au {formatShort(sunday)}
        </SectionSubtitle>
        <WeekRow>
          <WeekCard>
            <SessionGoalChart completed={weekSessions} goal={6} />
          </WeekCard>
          <WeekStatsColumn>
            <StatCard>
              <StatLabel>Durée d&apos;activité</StatLabel>
              <div>
                <StatValue sx={{ color: 'primary.main' }}>{weekDuration}</StatValue>
                <StatUnit>minutes</StatUnit>
              </div>
            </StatCard>
            <StatCard>
              <StatLabel>Distance</StatLabel>
              <div>
                <StatValue sx={{ color: 'error.main' }}>{weekDistance}</StatValue>
                <StatUnit>kilomètres</StatUnit>
              </div>
            </StatCard>
          </WeekStatsColumn>
        </WeekRow>
      </Content>
      <Footer />
    </PageWrapper>
  )
}

export default DashboardPage
