import styled from 'styled-components'
import { theme } from '../styles/theme'

interface InstructionsProps {
  isVisible: boolean
}

const InstructionsContainer = styled.div<InstructionsProps>`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;
  display: ${props => props.isVisible ? 'block' : 'none'};
`

const InstructionsTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
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
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const StepNumber = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.text};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.sm};
  flex-shrink: 0;
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
  line-height: 1.5;
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
  }
]

export const Instructions = ({ isVisible }: InstructionsProps) => {
  if (!isVisible) {
    return null
  }

  return (
    <InstructionsContainer isVisible={isVisible}>
      <InstructionsTitle>Here's exactly what to do next:</InstructionsTitle>
      <StepsList>
        {steps.map((step, index) => (
          <StepItem key={index}>
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