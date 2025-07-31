import styled from 'styled-components'
import { theme } from '../styles/theme'
import { 
  FaGoogle, 
  FaGithub, 
  FaEnvelope, 
  FaLock, 
  FaFacebook 
} from 'react-icons/fa'

interface AuthProvider {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ size?: number; color?: string }>
}

interface ProviderSelectorProps {
  selectedProviders: string[]
  onProviderToggle: (providerId: string) => void
}

const ProviderSection = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  background: ${theme.colors.background};
  width: 100%;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(139, 94, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`

const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
  width: 100%;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 1;
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

const ProviderIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  
  svg {
    width: 24px;
    height: 24px;
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

const Checkmark = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 24px;
  height: 24px;
  background: ${props => props.isSelected ? theme.colors.success : 'transparent'};
  border: 2px solid ${props => props.isSelected ? theme.colors.success : theme.colors.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &::after {
    content: '✓';
    color: white;
    font-size: 12px;
    font-weight: ${theme.typography.fontWeight.bold};
    opacity: ${props => props.isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`

const SelectedProvidersInfo = styled.div<{ hasSelection: boolean }>`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: ${props => props.hasSelection ? 1 : 0};
  transform: ${props => props.hasSelection ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.primary});
    border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  }
`

const SelectedProvidersText = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.md};
`

const SelectedIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`

const SelectedIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const providers: AuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    description: 'Sign in with Google account',
    icon: FaGoogle
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sign in with GitHub account',
    icon: FaGithub
  },
  {
    id: 'email',
    name: 'Email + Password',
    description: 'Traditional email and password authentication',
    icon: FaEnvelope
  },
  {
    id: 'otp',
    name: 'OTP',
    description: 'One-time password authentication',
    icon: FaLock
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Sign in with Facebook account',
    icon: FaFacebook
  }
]

export const ProviderSelector = ({ selectedProviders, onProviderToggle }: ProviderSelectorProps) => {
  const selectedProvidersData = providers.filter(provider => selectedProviders.includes(provider.id))
  const hasSelection = selectedProviders.length > 0

  return (
    <ProviderSection id="quickstart">
      <SectionTitle>What authentication would you like in your app?</SectionTitle>
      <ProviderGrid>
        {providers.map((provider) => {
          const IconComponent = provider.icon
          return (
            <ProviderCard
              key={provider.id}
              isSelected={selectedProviders.includes(provider.id)}
              onClick={() => onProviderToggle(provider.id)}
              className="fade-in-up"
            >
              <Checkmark isSelected={selectedProviders.includes(provider.id)} />
              <ProviderIcon>
                <IconComponent size={24} />
              </ProviderIcon>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderDescription>{provider.description}</ProviderDescription>
            </ProviderCard>
          )
        })}
      </ProviderGrid>
      
      <SelectedProvidersInfo hasSelection={hasSelection}>
        <SelectedProvidersText>
          You want to generate authentication with:
        </SelectedProvidersText>
        <SelectedIconsContainer>
          {selectedProvidersData.map((provider) => {
            const IconComponent = provider.icon
            return (
              <SelectedIcon key={provider.id}>
                <IconComponent size={16} />
              </SelectedIcon>
            )
          })}
        </SelectedIconsContainer>
      </SelectedProvidersInfo>
    </ProviderSection>
  )
} 