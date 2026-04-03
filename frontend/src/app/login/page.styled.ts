'use client'

import { styled } from '@mui/material/styles'
import { Box, Button, TextField, Typography } from '@mui/material'

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
  background-color: #f8f8ff;
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

export const FormCard = styled(Box)`
  background: white;
  border-radius: 12px;
  padding: 40px;
  max-width: 480px;
`

export const Logo = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  color: #ff0000;
  margin-bottom: 40px;
  letter-spacing: 2px;
`

export const Title = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  color: #0000ff;
  margin-bottom: 32px;
  line-height: 1.2;
`

export const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`

export const SubmitButton = styled(Button)`
  background-color: #0000ff;
  color: white;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  text-transform: none;
  margin-top: 8px;
  &:hover {
    background-color: #0000cc;
  }
`

export const ForgotLink = styled(Typography)`
  margin-top: 16px;
  color: #333;
  cursor: pointer;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`