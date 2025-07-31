import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../styles/theme'
import { useClipboard } from '../hooks/useClipboard'

const ALL_PROVIDERS = ['google', 'github', 'email', 'otp', 'facebook']

// Layout & Wrapper
export const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
`

const Container = styled.div`
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

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing['2xl']};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing['3xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

// Provider Cards
const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
  width: 100%;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ToggleCard = styled.div<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? theme.colors.primary : theme.colors.surface};
  border: 1px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: 12px;
  padding: ${theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.isSelected ? theme.colors.white : theme.colors.text};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    opacity: ${props => props.isSelected ? 0.1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 20px rgba(139, 94, 255, 0.3);
    transform: translateY(-2px);
  }
  
  &:hover::before {
    opacity: 0.05;
  }
`

const ProviderName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
  position: relative;
  z-index: 1;
`

const ProviderDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.8;
  line-height: 1.4;
  position: relative;
  z-index: 1;
`

// Command Generator
const CommandContainer = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
  position: relative;
  backdrop-filter: blur(10px);
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

const CommandTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '⚡';
    font-size: 1.2em;
  }
`

const CommandCode = styled.code`
  display: block;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-family: 'JetBrains Mono', monospace;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  position: relative;
  overflow-x: auto;
  
  &::before {
    content: '$ ';
    color: ${theme.colors.accent};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(90deg, transparent, ${theme.colors.background});
    pointer-events: none;
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
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  
  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '✓';
    font-weight: ${theme.typography.fontWeight.bold};
  }
`

// Generate Button
const GenerateButton = styled.button<{ disabled: boolean }>`
  background: ${props => props.disabled ? theme.colors.border : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  height: 56px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled)::before {
    left: 100%;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 94, 255, 0.3);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`

// Option Cards
const OptionsContainer = styled.div`
  margin-top: ${theme.spacing['3xl']};
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

const providerInfo = {
  google: { name: 'Google', description: 'Sign in with Google account' },
  github: { name: 'GitHub', description: 'Sign in with GitHub account' },
  email: { name: 'Email + Password', description: 'Traditional email and password authentication' },
  otp: { name: 'OTP', description: 'One-time password authentication' },
  facebook: { name: 'Facebook', description: 'Sign in with Facebook account' }
}

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

export const QuickstartBuilder: React.FC = () => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const { isCopied, copyToClipboard } = useClipboard()

  const toggleProvider = (provider: string) => {
    setSelectedProviders(prev => 
      prev.includes(provider) 
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    )
  }

  const handleGenerate = () => {
    if (selectedProviders.length > 0) {
      setShowOptions(true)
    }
  }

  const command = `npx @stackframe/init-stack --providers ${selectedProviders.join(',')}`
  const cursorPrompt = generateCursorPrompt(selectedProviders)

  const handleCopyCommand = () => {
    copyToClipboard(command)
  }

  const handleCopyPrompt = () => {
    copyToClipboard(cursorPrompt)
  }

  return (
    <PageWrapper>
      <Container>
        <Title>Build Your Authentication</Title>
        <Subtitle>
          Select your authentication providers and choose your preferred setup method
        </Subtitle>

        <ProviderGrid>
          {ALL_PROVIDERS.map(provider => (
            <ToggleCard
              key={provider}
              isSelected={selectedProviders.includes(provider)}
              onClick={() => toggleProvider(provider)}
              aria-label={`Select ${providerInfo[provider as keyof typeof providerInfo].name} authentication`}
            >
              <ProviderName>
                {providerInfo[provider as keyof typeof providerInfo].name}
              </ProviderName>
              <ProviderDescription>
                {providerInfo[provider as keyof typeof providerInfo].description}
              </ProviderDescription>
            </ToggleCard>
          ))}
        </ProviderGrid>

        <CommandContainer>
          <CommandTitle>Generated Command</CommandTitle>
          <CommandCode>{command}</CommandCode>
          <CopyButton 
            onClick={handleCopyCommand}
            aria-label="Copy command to clipboard"
          >
            Copy Command
          </CopyButton>
          {isCopied && <SuccessMessage>Copied!</SuccessMessage>}
        </CommandContainer>

        <GenerateButton
          disabled={selectedProviders.length === 0}
          onClick={handleGenerate}
          aria-label="Generate authentication setup options"
        >
          {selectedProviders.length === 0 ? 'Please choose a method' : 'Generate Options'}
        </GenerateButton>

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
      </Container>
    </PageWrapper>
  )
} 