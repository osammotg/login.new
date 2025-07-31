import styled from 'styled-components'
import { theme } from '../styles/theme'

const FeaturesSection = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  background: ${theme.colors.background};
  width: 100%;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin-top: ${theme.spacing['3xl']};
  width: 100%;
  padding: 0 ${theme.spacing.lg};
`

const FeatureCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.primary};
  }
`

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  font-size: 24px;
  color: white;
`

const FeatureTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`

const FeatureDescription = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`

const features = [
  {
    icon: '🏢',
    title: 'Organizations & teams',
    description: 'Manage users across multiple organizations with role-based access control.'
  },
  {
    icon: '🔐',
    title: 'Permissions & RBAC',
    description: 'Fine-grained permissions and role-based access control for your applications.'
  },
  {
    icon: '🔗',
    title: '3rd-party OAuth',
    description: 'Seamless integration with Google, GitHub, and other OAuth providers.'
  },
  {
    icon: '🎨',
    title: 'Headless or headful UI',
    description: 'Choose between our beautiful pre-built UI or build your own custom interface.'
  },
  {
    icon: '👤',
    title: 'Impersonation',
    description: 'Test user experiences and debug issues with user impersonation features.'
  },
  {
    icon: '🔔',
    title: 'Webhooks',
    description: 'Get real-time notifications for user events and authentication activities.'
  }
]

export const Features = () => {
  return (
    <FeaturesSection>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  )
} 