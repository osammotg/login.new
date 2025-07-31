import styled from 'styled-components'
import { theme } from '../styles/theme'

interface AuthProvider {
  id: string
  name: string
  description: string
  icon?: string
}

interface ProviderSelectorProps {
  selectedProviders: string[]
  onProviderToggle: (providerId: string) => void
}

const ProviderSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.background};
  width: 100%;
  text-align: center;
`

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`

const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
  width: 100%;
  padding: 0 ${theme.spacing.lg};
`

const ProviderCard = styled.div<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? theme.colors.surface : 'transparent'};
  border: 2px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
    opacity: ${props => props.isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: ${props => props.isSelected ? theme.colors.secondary : theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(139, 94, 255, 0.1);
  }
`

const ProviderName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`

const ProviderDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
`

const providers: AuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    description: 'Sign in with Google account'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sign in with GitHub account'
  },
  {
    id: 'email',
    name: 'Email + Password',
    description: 'Traditional email and password authentication'
  },
  {
    id: 'otp',
    name: 'OTP',
    description: 'One-time password authentication'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Sign in with Facebook account'
  }
]

export const ProviderSelector = ({ selectedProviders, onProviderToggle }: ProviderSelectorProps) => {
  return (
    <ProviderSection id="quickstart">
      <SectionTitle>What authentication would you like in your app?</SectionTitle>
      <ProviderGrid>
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            isSelected={selectedProviders.includes(provider.id)}
            onClick={() => onProviderToggle(provider.id)}
            className="fade-in-up"
          >
            <ProviderName>{provider.name}</ProviderName>
            <ProviderDescription>{provider.description}</ProviderDescription>
          </ProviderCard>
        ))}
      </ProviderGrid>
    </ProviderSection>
  )
} 