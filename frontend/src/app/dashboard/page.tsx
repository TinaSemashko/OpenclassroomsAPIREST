'use client'

import useUserData from '@/lib/useUserData'
import Navbar from '@/components/Navbar/Navbar'
import {
  PageWrapper,
  Content,
  Banner,
  BannerText,
  BannerButton,
  ProfileCard,
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
  StatValue,
  StatLabel,
} from './page.styled'

const DashboardPage = () => {
  const { profile, stats, sessions, loading } = useUserData()

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

  if (loading || !profile || !stats) {
    return null
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
          <ProfileAvatar
            src={profile.profilePicture}
            alt={`${profile.firstName} ${profile.lastName}`}
          />
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
            {/* BarChart km par semaine — prochaine étape */}
            <p>BarChart placeholder</p>
          </ChartCard>
          <ChartCard>
            {/* ComposedChart BPM — prochaine étape */}
            <p>BPM Chart placeholder</p>
          </ChartCard>
        </ChartsRow>

        {/* ---- Cette semaine ---- */}
        <SectionTitle>Cette semaine</SectionTitle>
        <SectionSubtitle>
          {sessions.length > 0
            ? `Du ${sessions[0].date} au ${sessions[sessions.length - 1].date}`
            : 'Aucune session cette semaine'}
        </SectionSubtitle>
        <WeekRow>
          <WeekCard>
            {/* PieChart donut — prochaine étape */}
            <StatValue sx={{ color: 'primary.main' }}>
              x{weekSessions}
            </StatValue>
            <StatLabel>sur objectif de 6</StatLabel>
            <StatLabel>Courses hebdomadaire réalisées</StatLabel>
          </WeekCard>
          <WeekCard>
            <StatLabel>Durée d&apos;activité</StatLabel>
            <StatValue sx={{ color: 'primary.main' }}>{weekDuration}</StatValue>
            <StatLabel>minutes</StatLabel>
          </WeekCard>
          <WeekCard>
            <StatLabel>Distance</StatLabel>
            <StatValue sx={{ color: 'error.main' }}>{weekDistance}</StatValue>
            <StatLabel>kilomètres</StatLabel>
          </WeekCard>
        </WeekRow>
      </Content>
    </PageWrapper>
  )
}

export default DashboardPage
