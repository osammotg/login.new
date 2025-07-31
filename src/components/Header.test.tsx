import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders Stack-Auth brand link with correct href', () => {
    render(<Header />)
    
    const brandLink = screen.getByRole('link', { name: /visit stackauth website/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', 'https://stack-auth.com')
    expect(brandLink).toHaveAttribute('target', '_blank')
    expect(brandLink).toHaveAttribute('rel', 'noopener')
    expect(brandLink).toHaveTextContent('Stack-Auth')
  })

  it('renders Docs link', () => {
    render(<Header />)
    
    const docsLink = screen.getByRole('link', { name: /view documentation/i })
    expect(docsLink).toBeInTheDocument()
    expect(docsLink).toHaveTextContent('Docs')
    expect(docsLink).toHaveAttribute('href', 'https://docs.stack-auth.com')
    expect(docsLink).toHaveAttribute('target', '_blank')
    expect(docsLink).toHaveAttribute('rel', 'noopener')
  })

  it('renders Quickstart link', () => {
    render(<Header />)
    
    const quickstartLink = screen.getByRole('link', { name: /go to quickstart section/i })
    expect(quickstartLink).toBeInTheDocument()
    expect(quickstartLink).toHaveTextContent('Quickstart')
    expect(quickstartLink).toHaveAttribute('href', '#quickstart')
  })

  it('renders Contact link', () => {
    render(<Header />)
    
    const contactLink = screen.getByRole('link', { name: /contact support/i })
    expect(contactLink).toBeInTheDocument()
    expect(contactLink).toHaveTextContent('Contact')
    expect(contactLink).toHaveAttribute('href', 'mailto:support@stack-auth.com?subject=Need%20help%20with%20Stack-Auth')
  })

  it('has proper navigation role', () => {
    render(<Header />)
    
    const navigation = screen.getByRole('navigation', { name: /main navigation/i })
    expect(navigation).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Header />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4) // Brand link + 3 nav links
    
    const linkTexts = links.map(link => link.textContent)
    expect(linkTexts).toContain('Stack-Auth')
    expect(linkTexts).toContain('Docs')
    expect(linkTexts).toContain('Quickstart')
    expect(linkTexts).toContain('Contact')
  })
}) 