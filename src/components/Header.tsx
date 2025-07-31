import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(11, 15, 30, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${theme.colors.border};
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
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  
  &:hover {
    color: ${theme.colors.text};
    background: rgba(139, 94, 255, 0.1);
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