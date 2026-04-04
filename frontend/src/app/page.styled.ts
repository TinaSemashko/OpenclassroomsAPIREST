'use client'

import { styled } from '@mui/material/styles'
import { Box, Button, Typography } from '@mui/material'

export const PageWrapper = styled(Box)`
  display: flex;
  height: 100vh;
  width: 100%;
`

export const LeftPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  width: 50%;
  background-color: ${({ theme }) => theme.palette.background.default};
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
    padding: 40px 24px;
  }
`

export const RightPanel = styled(Box)`
  width: 50%;
  position: relative;
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down('md')} {
    display: none;
  }
`

export const HeroImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const LogoRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
`

export const Logo = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.error.main};
  letter-spacing: 2px;
`

export const Title = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 16px;
  line-height: 1.2;
`

export const Subtitle = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 32px;
  line-height: 1.5;
`

export const LoginButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.background.paper};
  padding: 14px 40px;
  border-radius: 8px;
  font-size: 16px;
  text-transform: none;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`
