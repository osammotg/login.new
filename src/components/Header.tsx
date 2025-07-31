import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  backdrop-filter: blur(10px);
  background-color: rgba(15, 15, 35, 0.8);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`

const LogoText = styled.h1`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`

const Tagline = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeight.normal};
`

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`

const NavLink = styled.a`
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.text};
  }
`

export const Header = () => {
  const scrollToQuickstart = () => {
    const element = document.getElementById('quickstart')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoText>Stack-Auth</LogoText>
          <Tagline>Auth in seconds.</Tagline>
        </Logo>
        <Navigation>
          <NavLink onClick={scrollToQuickstart}>Quickstart</NavLink>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  )
} 