'use client'

import useAuth from '@/lib/useAuth'
import LogoIcon from './LogoIcon'
import {
  StyledAppBar,
  StyledToolbar,
  LogoWrapper,
  LogoText,
  NavLinks,
  NavLink,
  LogoutLink,
} from './Navbar.styled'

const Navbar = () => {
  const { logout } = useAuth()

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoWrapper>
          <LogoIcon />
          <LogoText>SPORTSEE</LogoText>
        </LogoWrapper>
        <NavLinks>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="#">Coach AI</NavLink>
          <NavLink href="/profil">Mon profil</NavLink>
          <LogoutLink
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              logout()
            }}
          >
            Se déconnecter
          </LogoutLink>
        </NavLinks>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
