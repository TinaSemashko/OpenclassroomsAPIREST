'use client'

import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/appContext'
import {
  StyledAppBar,
  StyledToolbar,
  Logo,
  NavLinks,
  NavLink,
  LogoutLink,
} from './Navbar.styled'

const Navbar = () => {
  const { setUser } = useAppContext()
  const router = useRouter()

  const handleLogout = () => {
    setUser(null)
    router.push('/login')
  }

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
          <LogoutLink href="#" onClick={handleLogout}>
            Se déconnecter
          </LogoutLink>
        </NavLinks>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
