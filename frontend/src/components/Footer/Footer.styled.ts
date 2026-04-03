'use client'

import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import Link from 'next/link'

export const FooterWrapper = styled('footer')`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.background.default};
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 16px;
    flex-direction: column;
    gap: 12px;
  }
`

export const FooterText = styled(Typography)`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const FooterRight = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const FooterLink = styled(Link)`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`
