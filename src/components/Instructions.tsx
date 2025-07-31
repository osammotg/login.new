import styled from 'styled-components'
import { theme } from '../styles/theme'

interface InstructionsProps {
  isVisible: boolean
}

const InstructionsContainer = styled.div<InstructionsProps>`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.4s ease;
  display: ${props => props.isVisible ? 'block' : 'none'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(91, 192, 190, 0.1);
  
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

const InstructionsTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '🎯';
    font-size: ${theme.typography.fontSize.xl};
  }
`

const StepsList = styled.ol`
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
  margin: 0;
`

const StepItem = styled.li`
  counter-increment: step-counter;
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: rgba(139, 94, 255, 0.05);
  }
`

const StepNumber = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.text};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.sm};
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(139, 94, 255, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    border-radius: 50%;
    z-index: -1;
    opacity: 0.3;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.6;
    }
  }
`

const StepContent = styled.div`
  flex: 1;
`

const StepTitle = styled.h4`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.xs} 0;
`

const StepDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`

const steps = [
  {
    title: 'Open your terminal',
    description: 'Open your terminal or command prompt in your project directory.'
  },
  {
    title: 'Paste the command',
    description: 'Copy and paste the generated command into your terminal.'
  },
  {
    title: 'Follow the prompts',
    description: 'Follow the interactive prompts to complete your authentication setup.'
  },
  {
    title: "That's it—you're live!",
    description: 'Your authentication is now set up and ready to use.'
  }
]

export const Instructions = ({ isVisible }: InstructionsProps) => {
  if (!isVisible) {
    return null
  }

  return (
    <InstructionsContainer isVisible={isVisible} className="fade-in">
      <InstructionsTitle>Here's exactly what to do next:</InstructionsTitle>
      <StepsList>
        {steps.map((step, index) => (
          <StepItem key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <StepNumber>{index + 1}</StepNumber>
            <StepContent>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
          </StepItem>
        ))}
      </StepsList>
    </InstructionsContainer>
  )
} 