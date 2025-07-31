import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const FooterContainer = styled.footer`
  background: #0B0F1E;
  padding: 48px 1rem;
  border-top: 1px solid #1E2230;
`

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

const FooterText = styled.p`
  color: #F0F0F5;
  line-height: 1.6;
  font-size: ${theme.typography.fontSize.lg};
  margin: 0;
`

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          Hey — we know auth is a struggle.
          <br />
          That's why we built Stack-Auth: so you can focus on your product while we handle everything from authentication to analytics and payments. As easy as pasting a prompt into Cursor. 🚀
        </FooterText>
      </FooterContent>
    </FooterContainer>
  )
} 