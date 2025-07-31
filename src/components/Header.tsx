import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 64px;
  background: rgba(11, 15, 30, 0.9);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid ${theme.colors.border};
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`

const BrandLink = styled.a`
  font-weight: 700;
  color: ${theme.colors.white};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.xl};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`

const NavList = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    gap: ${theme.spacing.lg};
    overflow-x: auto;
    padding: ${theme.spacing.sm} 0;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const NavLink = styled.a`
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: color 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <BrandLink 
          href="https://stack-auth.com" 
          target="_blank" 
          rel="noopener"
          aria-label="Visit StackAuth website"
        >
          Stack-Auth
        </BrandLink>
        
        <NavList role="navigation" aria-label="Main navigation">
          <NavLink 
            href="https://docs.stack-auth.com" 
            target="_blank" 
            rel="noopener"
            aria-label="View documentation"
          >
            Docs
          </NavLink>
          <NavLink 
            href="#quickstart" 
            aria-label="Go to quickstart section"
          >
            Quickstart
          </NavLink>
          <NavLink 
            href="mailto:support@stack-auth.com?subject=Need%20help%20with%20Stack-Auth" 
            aria-label="Contact support"
          >
            Contact
          </NavLink>
        </NavList>
      </HeaderContent>
    </HeaderContainer>
  )
} 