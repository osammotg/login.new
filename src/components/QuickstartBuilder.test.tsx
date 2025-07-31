import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuickstartBuilder } from './QuickstartBuilder'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}))

// Mock the useClipboard hook
vi.mock('../hooks/useClipboard', () => ({
  useClipboard: () => ({
    isCopied: false,
    copyToClipboard: vi.fn()
  })
}))

describe('QuickstartBuilder', () => {
  it('mounts the component and allows provider selection', () => {
    render(<QuickstartBuilder />)
    
    // Check that the title is rendered
    expect(screen.getByText('Build Your Authentication')).toBeInTheDocument()
    
    // Check that provider cards are rendered
    expect(screen.getByText('Google')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Email + Password')).toBeInTheDocument()
    expect(screen.getByText('OTP')).toBeInTheDocument()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
  })

  it('selects google provider and generates options', () => {
    render(<QuickstartBuilder />)
    
    // Find and click the Google provider card
    const googleCard = screen.getByText('Google').closest('div')
    expect(googleCard).toBeInTheDocument()
    
    if (googleCard) {
      fireEvent.click(googleCard)
    }
    
    // Check that the generate button is enabled and shows correct text
    const generateButton = screen.getByRole('button', { name: /generate authentication setup options/i })
    expect(generateButton).toBeInTheDocument()
    expect(generateButton).not.toBeDisabled()
    
    // Click the generate button
    fireEvent.click(generateButton)
    
    // Check that both option cards are now in the DOM
    expect(screen.getByText('Option 1: For Coders')).toBeInTheDocument()
    expect(screen.getByText('Option 2: For Vibe Coders (AI Setup)')).toBeInTheDocument()
    
    // Check that the command is displayed in both options
    const commandText = 'npx @stackframe/init-stack --providers google'
    expect(screen.getAllByText(commandText)).toHaveLength(2)
  })

  it('shows disabled state when no providers are selected', () => {
    render(<QuickstartBuilder />)
    
    // Check that the generate button is disabled initially
    const generateButton = screen.getByRole('button', { name: /generate authentication setup options/i })
    expect(generateButton).toBeInTheDocument()
    expect(generateButton).toBeDisabled()
  })

  it('displays the generated command correctly', () => {
    render(<QuickstartBuilder />)
    
    // Select multiple providers
    const googleCard = screen.getByText('Google').closest('div')
    const githubCard = screen.getByText('GitHub').closest('div')
    
    if (googleCard) fireEvent.click(googleCard)
    if (githubCard) fireEvent.click(githubCard)
    
    // Check that the command is updated with selected providers
    const commandText = 'npx @stackframe/init-stack --providers google,github'
    expect(screen.getByText(commandText)).toBeInTheDocument()
  })

  it('includes copy buttons for commands and prompts', () => {
    render(<QuickstartBuilder />)
    
    // Select a provider and generate options
    const googleCard = screen.getByText('Google').closest('div')
    if (googleCard) fireEvent.click(googleCard)
    
    const generateButton = screen.getByRole('button', { name: /generate authentication setup options/i })
    fireEvent.click(generateButton)
    
    // Check that copy buttons are present
    const copyButtons = screen.getAllByRole('button', { name: /copy/i })
    expect(copyButtons.length).toBeGreaterThan(0)
  })

  it('displays instructions and checklist for coders option', () => {
    render(<QuickstartBuilder />)
    
    // Select a provider and generate options
    const googleCard = screen.getByText('Google').closest('div')
    if (googleCard) fireEvent.click(googleCard)
    
    const generateButton = screen.getByRole('button', { name: /generate authentication setup options/i })
    fireEvent.click(generateButton)
    
    // Check that instructions are displayed
    expect(screen.getByText('Open terminal at project root.')).toBeInTheDocument()
    expect(screen.getByText('Paste the command above.')).toBeInTheDocument()
    expect(screen.getByText('Follow the CLI wizard (project name, callback URLs, env keys).')).toBeInTheDocument()
    
    // Check that checklist items are displayed
    expect(screen.getByText('stack.config.ts exists.')).toBeInTheDocument()
    expect(screen.getByText('ENV vars set.')).toBeInTheDocument()
    expect(screen.getByText('/login page renders provider buttons.')).toBeInTheDocument()
  })

  it('displays AI prompt textarea for vibe coders option', () => {
    render(<QuickstartBuilder />)
    
    // Select a provider and generate options
    const googleCard = screen.getByText('Google').closest('div')
    if (googleCard) fireEvent.click(googleCard)
    
    const generateButton = screen.getByRole('button', { name: /generate authentication setup options/i })
    fireEvent.click(generateButton)
    
    // Check that the textarea is present and contains the prompt
    const textarea = screen.getByRole('textbox', { name: /ai setup prompt for cursor/i })
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('readonly')
    
    // Check that the prompt contains expected content
    const promptContent = textarea.textContent || ''
    expect(promptContent).toContain('Part 1 – Evaluate Current Setup')
    expect(promptContent).toContain('Part 2 – Read Docs')
    expect(promptContent).toContain('Part 3 – Install or Update Auth')
    expect(promptContent).toContain('Verification Checklist')
  })
}) 