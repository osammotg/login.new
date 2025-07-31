import styled from 'styled-components'
import { theme } from '../styles/theme'
import { Button } from './Button'

interface CommandGeneratorProps {
  command: string
  onCopy: () => void
  isCopied: boolean
}

const CommandContainer = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 94, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
    border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  }
`

const CommandHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`

const CommandTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '⚡';
    font-size: ${theme.typography.fontSize.xl};
  }
`

const CommandCode = styled.code`
  display: block;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.6;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '$';
    color: ${theme.colors.primary};
    margin-right: ${theme.spacing.md};
    font-weight: ${theme.typography.fontWeight.bold};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 60px;
    background: linear-gradient(90deg, transparent, ${theme.colors.background});
    pointer-events: none;
  }
`

const CopyButton = styled(Button)`
  position: absolute;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  min-width: auto;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  z-index: 2;
`

const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(34, 197, 94, 0.1);
  border-radius: ${theme.borderRadius.md};
  border: 1px solid rgba(34, 197, 94, 0.2);
  
  &::before {
    content: '✓';
    font-weight: ${theme.typography.fontWeight.bold};
  }
`

export const CommandGenerator = ({ command, onCopy, isCopied }: CommandGeneratorProps) => {
  if (!command) {
    return null
  }

  return (
    <CommandContainer className="fade-in">
      <CommandHeader>
        <CommandTitle>Generated Command</CommandTitle>
        <CopyButton
          variant="secondary"
          size="sm"
          onClick={onCopy}
          disabled={isCopied}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </CopyButton>
      </CommandHeader>
      
      <CommandCode>{command}</CommandCode>
      
      {isCopied && (
        <SuccessMessage>
          Command copied to clipboard
        </SuccessMessage>
      )}
    </CommandContainer>
  )
} 