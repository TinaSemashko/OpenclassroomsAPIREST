'use client'

import useAuth from '@/lib/useAuth'
import {
  StyledAppBar,
  StyledToolbar,
  Logo,
  NavLinks,
  NavLink,
  LogoutLink,
} from './Navbar.styled'

const Navbar = () => {
  const { logout } = useAuth()

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo>
          <span>M</span>SPORTSEE
        </Logo>
        <NavLinks>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="#">Coach AI</NavLink>
          <NavLink href="/profil">Mon profil</NavLink>
          <LogoutLink href="#" onClick={logout}>
            Se déconnecter
          </LogoutLink>
        </NavLinks>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
