import styled from 'styled-components'
import { theme } from '../styles/theme'
import { Button } from './Button'

interface CommandGeneratorProps {
  command: string
  onCopy: () => void
  isCopied: boolean
}

const CommandContainer = styled.div`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
  position: relative;
`

const CommandHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`

const CommandTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
`

const CommandCode = styled.code`
  display: block;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.5;
  margin: ${theme.spacing.md} 0;
`

const CopyButton = styled(Button)`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  min-width: auto;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
`

const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`

export const CommandGenerator = ({ command, onCopy, isCopied }: CommandGeneratorProps) => {
  if (!command) {
    return null
  }

  return (
    <CommandContainer>
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
          ✓ Command copied to clipboard
        </SuccessMessage>
      )}
    </CommandContainer>
  )
} 