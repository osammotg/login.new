import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: Inter, system-ui, sans-serif;
  font-weight: 500;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
    gap: 8px;
  }
`;

const CrossedOutText = styled.span`
  position: relative;
  color: ${theme.colors.textSecondary};
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #8C5EFF 0%, #A78BFA 100%);
    border-radius: 1px;
    transform: translateY(-50%);
    box-shadow: 0 0 8px rgba(140, 94, 255, 0.3);
  }
`;

const FinalText = styled.span`
  color: #8C5EFF;
  font-weight: 600;
  font-size: ${theme.typography.fontSize.xl};
  text-shadow: 0 0 20px rgba(140, 94, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    color: #A78BFA;
    text-shadow: 0 0 30px rgba(140, 94, 255, 0.5);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export const AnimatedText = () => {
  return (
    <TextContainer>
      <CrossedOutText>Do auth in hours</CrossedOutText>
      <CrossedOutText>Do auth in minutes</CrossedOutText>
      <FinalText>Do auth in seconds</FinalText>
    </TextContainer>
  );
}; 