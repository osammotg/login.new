import { useState } from 'react'
import { Header } from './components/Header'
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
`

const MainContent = styled.main`
  padding-top: 80px; // Account for fixed header
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
`

const QuickstartSection = styled.section`
  width: 100%;
  max-width: 800px;
  text-align: center;
`

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: ${theme.borderRadius.md};
  border: 1px solid rgba(239, 68, 68, 0.2);
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
        <MainContent>
          <QuickstartSection id="quickstart">
            <Title>What authentication would you like in your app?</Title>
            <Subtitle>
              Choose your authentication providers and we'll generate the perfect setup command for you.
            </Subtitle>
            
            <ProviderSelector
              selectedProviders={selectedProviders}
              onProviderToggle={toggleProvider}
            />
            
            <Button
              variant={hasSelection ? 'primary' : 'disabled'}
              size="lg"
              disabled={!hasSelection}
              onClick={handleGenerateAuth}
            >
              Generate My Auth
            </Button>
            
            {!hasSelection && (
              <ErrorMessage>
                Please select at least one authentication provider to continue.
              </ErrorMessage>
            )}

            {showInstructions && (
              <>
                <CommandGenerator
                  command={generatedCommand}
                  onCopy={handleCopyCommand}
                  isCopied={isCopied}
                />
                <Instructions isVisible={showInstructions} />
              </>
            )}
          </QuickstartSection>
        </MainContent>
      </AppContainer>
    </>
  )
}

export default App
