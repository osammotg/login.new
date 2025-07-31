import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../styles/theme'
import { 
  FaGoogle, 
  FaGithub, 
  FaEnvelope, 
  FaLock, 
  FaFacebook 
} from 'react-icons/fa'
import { useClipboard } from '../hooks/useClipboard'
import { Button } from './Button'

interface AuthProvider {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ size?: number; color?: string }>
}

interface ProviderSelectorProps {
  selectedProviders: string[]
  onProviderToggle: (providerId: string) => void
  showOptions?: boolean
  onGenerateOptions?: () => void
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
  margin-bottom: ${theme.spacing.lg};
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

const GenerateButtonContainer = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
`

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${theme.borderRadius.lg};
  max-width: 500px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '⚠️';
    margin-right: ${theme.spacing.sm};
  }
`

// Dual Options Components
const OptionsContainer = styled.div`
  margin-top: ${theme.spacing['2xl']};
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin-top: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const OptionCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
    border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  }
`

const OptionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

const CodeBlock = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
  position: relative;
  font-family: 'JetBrains Mono', monospace;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  overflow-x: auto;
  
  &::before {
    content: '$ ';
    color: ${theme.colors.accent};
  }
`

const InstructionsList = styled.ol`
  text-align: left;
  margin: ${theme.spacing.lg} 0;
  padding-left: ${theme.spacing.lg};
  
  li {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
    line-height: 1.6;
  }
`

const Checklist = styled.ul`
  text-align: left;
  margin: ${theme.spacing.lg} 0;
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.textSecondary};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    
    &::before {
      content: '☐';
      color: ${theme.colors.accent};
      font-size: 1.2em;
    }
  }
`

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-family: 'JetBrains Mono', monospace;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  resize: vertical;
  line-height: 1.5;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(139, 94, 255, 0.2);
  }
`

const CopyButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${theme.spacing.md};
  
  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const generateCursorPrompt = (providers: string[]) => {
  const providersCsv = providers.join(',')
  const providerDocs = providers.map(provider => 
    `https://docs.stack-auth.com/docs/react/concepts/auth-providers#${provider}`
  ).join('\n')
  
  return `Part 1 – Evaluate Current Setup
Scan the project for Stack-Auth config files.

Check for existing login/sign-up buttons.

Return AUTH_PRESENT and BUTTONS_PRESENT flags.

Part 2 – Read Docs
https://docs.stack-auth.com/docs/react/overview
${providerDocs}

Part 3 – Install or Update Auth
If AUTH_PRESENT=false:
a. Run npx @stackframe/init-stack --providers ${providersCsv}
b. Complete the CLI.

If AUTH_PRESENT=true:
a. Ensure ${providersCsv} are enabled in stack.config.ts
b. Add missing buttons.

Verification Checklist
 stack.config.ts lists ${providersCsv}

 ENV vars set

 /login navigates to /dashboard on success

Return SUCCESS when all boxes are checked.`
}

export const ProviderSelector = ({ selectedProviders, onProviderToggle, showOptions, onGenerateOptions }: ProviderSelectorProps) => {
  const { isCopied, copyToClipboard } = useClipboard()
  
  const selectedProvidersData = providers.filter(provider => selectedProviders.includes(provider.id))
  const hasSelection = selectedProviders.length > 0

  const command = `npx @stackframe/init-stack --providers ${selectedProviders.join(',')}`
  const cursorPrompt = generateCursorPrompt(selectedProviders)

  const handleCopyCommand = () => {
    copyToClipboard(command)
  }

  const handleCopyPrompt = () => {
    copyToClipboard(cursorPrompt)
  }

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

      <GenerateButtonContainer>
        <Button
          variant={hasSelection ? 'primary' : 'disabled'}
          size="lg"
          disabled={!hasSelection}
          onClick={onGenerateOptions}
          className={hasSelection ? 'glow' : ''}
        >
          {hasSelection ? 'Generate My Authentication Method' : 'Please choose a method'}
        </Button>
        
        {!hasSelection && (
          <ErrorMessage>
            Please select at least one authentication provider to continue.
          </ErrorMessage>
        )}
      </GenerateButtonContainer>

      <AnimatePresence>
        {showOptions && (
          <OptionsContainer>
            <OptionsGrid>
              <OptionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <OptionTitle>
                  <span role="img" aria-label="coder">👨‍💻</span>
                  Option 1: For Coders
                </OptionTitle>
                
                <CodeBlock>{command}</CodeBlock>
                
                <CopyButton 
                  onClick={handleCopyCommand}
                  aria-label="Copy command to clipboard"
                >
                  Copy Command
                </CopyButton>
                
                <InstructionsList>
                  <li>Open terminal at project root.</li>
                  <li>Paste the command above.</li>
                  <li>Follow the CLI wizard (project name, callback URLs, env keys).</li>
                </InstructionsList>
                
                <Checklist>
                  <li>stack.config.ts exists.</li>
                  <li>ENV vars set.</li>
                  <li>/login page renders provider buttons.</li>
                </Checklist>
              </OptionCard>

              <OptionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <OptionTitle>
                  <span role="img" aria-label="ai">🤖</span>
                  Option 2: For Vibe Coders (AI Setup)
                </OptionTitle>
                
                <Textarea
                  value={cursorPrompt}
                  readOnly
                  aria-label="AI setup prompt for Cursor"
                />
                
                <CopyButton 
                  onClick={handleCopyPrompt}
                  aria-label="Copy AI prompt to clipboard"
                >
                  Copy Prompt
                </CopyButton>
              </OptionCard>
            </OptionsGrid>
          </OptionsContainer>
        )}
      </AnimatePresence>
    </ProviderSection>
  )
} 