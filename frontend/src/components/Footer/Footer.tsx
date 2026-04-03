'use client'

import LogoIcon from '@/components/Navbar/LogoIcon'
import {
  FooterWrapper,
  FooterText,
  FooterRight,
  FooterLink,
} from './Footer.styled'

const Footer = () => (
  <FooterWrapper>
    <FooterText>&copy;Sportsee Tous droits réservés</FooterText>
    <FooterRight>
      <FooterLink href="#">Conditions générales</FooterLink>
      <FooterLink href="#">Contact</FooterLink>
      <LogoIcon />
    </FooterRight>
  </FooterWrapper>
)

export default Footer
