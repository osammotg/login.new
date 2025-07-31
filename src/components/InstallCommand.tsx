import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useClipboard } from '../hooks/useClipboard'

const InstallSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.background};
  width: 100%;
  text-align: center;
`

const CommandBox = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${theme.spacing['2xl']} 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  &::before {
    content: '$';
    color: ${theme.colors.primary};
    margin-right: ${theme.spacing.md};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`

const CommandText = styled.span`
  flex: 1;
  text-align: left;
  margin-left: ${theme.spacing.md};
`

const CopyButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: ${theme.spacing.md};
  
  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
`

export const InstallCommand = () => {
  const { isCopied, copyToClipboard } = useClipboard()
  const command = 'npx @stackframe/init-stack@latest'

  const handleCopy = () => {
    copyToClipboard(command)
  }

  return (
    <InstallSection>
      <CommandBox>
        <CommandText>{command}</CommandText>
        <CopyButton onClick={handleCopy}>
          {isCopied ? 'Copied!' : 'Copy'}
        </CopyButton>
      </CommandBox>
      {isCopied && (
        <SuccessMessage>
          ✓ Command copied to clipboard
        </SuccessMessage>
      )}
    </InstallSection>
  )
} 