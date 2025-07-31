import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #1A1F2E 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(139, 94, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(91, 192, 190, 0.1) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }
`

const HeroContent = styled.div`
  text-align: center;
  width: 100%;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 2;
`

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSize['6xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`

const HeroButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(139, 94, 255, 0.3);
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
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 94, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`

const FloatingStars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`

const Star = styled.div<{ x: number; y: number; delay: number }>`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${theme.colors.accent};
  border-radius: 50%;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  animation: twinkle 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
`

export const Hero = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }))

  return (
    <HeroSection>
      <FloatingStars>
        {stars.map((star, index) => (
          <Star key={index} x={star.x} y={star.y} delay={star.delay} />
        ))}
      </FloatingStars>
      <HeroContent className="fade-in-up">
        <HeroTitle>Fast, secure, open-source authentication.</HeroTitle>
        <HeroSubtitle>Do auth in minutes.</HeroSubtitle>
        <HeroButton onClick={() => document.getElementById('quickstart')?.scrollIntoView({ behavior: 'smooth' })}>
          Get Started →
        </HeroButton>
      </HeroContent>
    </HeroSection>
  )
} 