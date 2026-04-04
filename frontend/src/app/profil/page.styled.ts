'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const PageWrapper = styled(Box)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`

export const Content = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px;
  display: flex;
  gap: 40px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
    padding: 32px 16px;
  }
`

// ---- Left column ----

export const LeftColumn = styled(Box)`
  width: 340px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
  }
`

export const ProfileCard = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 20px;
`

export const AvatarWrapper = styled('div')`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
  flex-shrink: 0;
`

export const ProfileAvatar = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.15);
  }
`

export const ProfileName = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
`

export const ProfileSince = styled(Typography)`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const InfoCard = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

export const InfoTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 24px;
`

export const InfoRow = styled(Typography)`
  font-size: 15px;
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 8px 0;
`

// ---- Right column ----

export const RightColumn = styled(Box)`
  flex: 1;
`

export const SectionTitle = styled(Typography)`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 4px;
`

export const SectionSubtitle = styled(Typography)`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 24px;
`

export const StatsGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: 1fr;
  }
`

export const StatCard = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.palette.primary.main}4d;
  }
`

export const StatCardLabel = styled(Typography)`
  font-size: 14px;
  opacity: 0.85;
  margin-bottom: 8px;
`

export const StatCardValue = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  display: inline;
`

export const StatCardUnit = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  display: inline;
  margin-left: 4px;
`
