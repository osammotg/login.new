import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: 1.6;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
  }

  h1 {
    font-size: ${theme.typography.fontSize['5xl']};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['4xl']};
    }
  }

  h2 {
    font-size: ${theme.typography.fontSize['4xl']};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['3xl']};
    }
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textSecondary};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  code {
    font-family: ${theme.typography.fontFamily.mono};
    background-color: ${theme.colors.surface};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: 0.875em;
    color: ${theme.colors.text};
  }

  pre {
    background-color: ${theme.colors.surface};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    margin: ${theme.spacing.md} 0;
    border: 1px solid ${theme.colors.border};

    code {
      background: none;
      padding: 0;
    }
  }

  ::selection {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textSecondary};
  }

  /* Animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(139, 94, 255, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(139, 94, 255, 0.5);
    }
  }

  /* Utility classes */
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  .glow {
    animation: glow 2s ease-in-out infinite;
  }
` 