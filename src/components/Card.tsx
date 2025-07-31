import styled from 'styled-components'
import { theme } from '../styles/theme'

interface CardProps {
  isSelected?: boolean
  isClickable?: boolean
}

export const Card = styled.div<CardProps>`
  background-color: ${props => props.isSelected ? theme.colors.surface : 'transparent'};
  border: 2px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  transition: all 0.2s ease;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  position: relative;
  overflow: hidden;

  ${props => props.isClickable && `
    &:hover {
      border-color: ${props.isSelected ? theme.colors.secondary : theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `}

  ${props => props.isSelected && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
    }
  `}
` 