import { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
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

const MainContent = styled.main`
  width: 100%;
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
  const [showOptions, setShowOptions] = useState(false)

  const generatedCommand = buildCommand(selectedProviders)

  const handleGenerateAuth = () => {
    if (!hasSelection) {
      return
    }
    setShowOptions(true)
  }

  const handleCopyCommand = () => {
    copyToClipboard(generatedCommand)
  }

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent id="quickstart">
          <Hero />
          <Features />
          <InstallCommand />
          
          <QuickstartSection id="auth-selection">
            <QuickstartContainer>
              <ProviderSelector
                selectedProviders={selectedProviders}
                onProviderToggle={toggleProvider}
                showOptions={showOptions}
                onGenerateOptions={handleGenerateAuth}
              />
            </QuickstartContainer>
          </QuickstartSection>
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  )
}

export default App
