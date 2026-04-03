'use client'

import { styled } from '@mui/material/styles'
import { Box, Button, Typography } from '@mui/material'

// ---- Page layout ----

export const PageWrapper = styled(Box)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`

export const Content = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 40px;
`

// ---- Banner ----

export const Banner = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eeeeff;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 16px 24px;
  margin-bottom: 32px;
`

export const BannerText = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.disabled};
`

export const BannerButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.error.main};
  color: ${({ theme }) => theme.palette.background.paper};
  text-transform: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 14px;
  white-space: nowrap;
  &:hover {
    background-color: ${({ theme }) => theme.palette.error.dark};
  }
`

// ---- Profile card ----

export const ProfileCard = styled(Box)`
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 24px 32px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

export const ProfileAvatar = styled('img')`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`

export const ProfileInfo = styled(Box)`
  flex: 1;
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

export const DistanceBadge = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const DistanceLabel = styled(Typography)`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const DistanceValue = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 700;
`

// ---- Section titles ----

export const SectionTitle = styled(Typography)`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 8px;
`

export const SectionSubtitle = styled(Typography)`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 24px;
`

// ---- Charts row ----

export const ChartsRow = styled(Box)`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`

export const ChartCard = styled(Box)`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

// ---- This week section ----

export const WeekRow = styled(Box)`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`

export const WeekCard = styled(Box)`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

export const StatValue = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
`

export const StatLabel = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.secondary};
`
