import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { InstallCommand } from './components/InstallCommand'
import { ProviderSelector } from './components/ProviderSelector'
import { CommandGenerator } from './components/CommandGenerator'
import { Instructions } from './components/Instructions'
import { Button } from './components/Button'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/theme'
import { useProviderSelection } from './hooks/useProviderSelection'
import { useClipboard } from './hooks/useClipboard'
import { buildCommand } from './utils/commandBuilder'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  width: 100vw;
`

const QuickstartSection = styled.section`
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

const QuickstartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 1;
`

const ActionContainer = styled.div`
  margin-top: ${theme.spacing['2xl']};
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

const ResultsContainer = styled.div`
  margin-top: ${theme.spacing['3xl']};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

function App() {
  const { selectedProviders, toggleProvider, hasSelection } = useProviderSelection()
  const { isCopied, copyToClipboard } = useClipboard()
  const [showInstructions, setShowInstructions] = useState(false)

  const generatedCommand = buildCommand(selectedProviders)

  const handleGenerateAuth = () => {
    if (!hasSelection) {
      return
    }
    setShowInstructions(true)
  }

  const handleCopyCommand = () => {
    copyToClipboard(generatedCommand)
  }

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Hero />
        <Features />
        <InstallCommand />
        <QuickstartSection>
          <QuickstartContainer>
            <ProviderSelector
              selectedProviders={selectedProviders}
              onProviderToggle={toggleProvider}
            />
            
            <ActionContainer>
              <Button
                variant={hasSelection ? 'primary' : 'disabled'}
                size="lg"
                disabled={!hasSelection}
                onClick={handleGenerateAuth}
                className={hasSelection ? 'glow' : ''}
              >
                Generate My Auth
              </Button>
              
              {!hasSelection && (
                <ErrorMessage>
                  Please select at least one authentication provider to continue.
                </ErrorMessage>
              )}
            </ActionContainer>

            {showInstructions && (
              <ResultsContainer className="fade-in-up">
                <CommandGenerator
                  command={generatedCommand}
                  onCopy={handleCopyCommand}
                  isCopied={isCopied}
                />
                <Instructions isVisible={showInstructions} />
              </ResultsContainer>
            )}
          </QuickstartContainer>
        </QuickstartSection>
      </AppContainer>
    </>
  )
}

export default App
