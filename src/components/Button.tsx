import styled from 'styled-components'
import { theme } from '../styles/theme'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'disabled'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;

  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
        `
      case 'lg':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
          font-size: ${theme.typography.fontSize.lg};
        `
      default: // md
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.base};
        `
    }
  }}

  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          border: 2px solid ${theme.colors.border};
          
          &:hover:not(:disabled) {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
            transform: translateY(-2px);
          }
        `
      case 'disabled':
        return `
          background-color: ${theme.colors.border};
          color: ${theme.colors.textSecondary};
          cursor: not-allowed;
          opacity: 0.6;
        `
      default: // primary
        return `
          background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
          color: ${theme.colors.text};
          box-shadow: 0 4px 14px rgba(139, 94, 255, 0.3);
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 94, 255, 0.4);
            
            &::before {
              left: 100%;
            }
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
    }
  }}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
` 