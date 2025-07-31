import styled from 'styled-components'
import { theme } from '../styles/theme'
import { Card } from './Card'

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

const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
  width: 100%;
  max-width: 800px;
`

const ProviderCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 120px;
  justify-content: center;
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
    <ProviderGrid>
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          isSelected={selectedProviders.includes(provider.id)}
          isClickable={true}
          onClick={() => onProviderToggle(provider.id)}
        >
          <ProviderName>{provider.name}</ProviderName>
          <ProviderDescription>{provider.description}</ProviderDescription>
        </ProviderCard>
      ))}
    </ProviderGrid>
  )
} 