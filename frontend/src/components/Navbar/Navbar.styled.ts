'use client'

import { styled } from '@mui/material/styles'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 8px 40px;
`

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`

export const LogoText = styled(Typography)`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.palette.primary.main};
`

export const NavLinks = styled(Toolbar)`
  display: flex;
  gap: 32px;
`

export const NavLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.disabled};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const LogoutLink = styled(NavLink)`
  color: ${({ theme }) => theme.palette.primary.main};
`
