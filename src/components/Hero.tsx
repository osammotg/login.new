import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { TestimonialSlider } from './TestimonialSlider';

/* ——— Styled Components (existing) ——— */
const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #1A1F2E 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
`;

const HeroContent = styled.div`
  text-align: center;
  width: 100%;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding-top: 15vh;
  padding-bottom: 2rem;
`;

const TextContainer = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`;

const ButtonContainer = styled.div`
  margin-bottom: ${theme.spacing['4xl']};
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSize['6xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

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
`;

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
`;

const ButtonStarRay = styled.div<{ angle: number; delay: number }>`
  position: absolute;
  width: 3px;
  height: 3px;
  background: ${theme.colors.accent};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.accent}, transparent);
    transform: translate(-50%, -50%) rotate(${props => props.angle}deg);
    transform-origin: left center;
  }
  
  animation: buttonStarRay 0.8s ease-out forwards;
  animation-delay: ${props => props.delay}s;
`;

interface ButtonStar {
  id: number;
  angle: number;
  delay: number;
}

/* ——— New Star styles ——— */
const StarTrail = styled.div<{ x: number; y: number; angle: number }>`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${theme.colors.accent};
  border-radius: 50%;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: rotate(${props => props.angle}deg);
  pointer-events: none;
  z-index: 1;
  box-shadow: 0 0 8px ${theme.colors.accent};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.accent}, transparent);
    transform: translate(-50%, -50%);
    transform-origin: left center;
    box-shadow: 0 0 4px ${theme.colors.accent};
  }
`;

const FloatingStars = styled.div<{ isPaused: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  animation-play-state: ${props => props.isPaused ? 'paused' : 'running'};
`;

const Star = styled.div<{ x: number; y: number; delay: number; isPaused: boolean }>`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${theme.colors.accent};
  border-radius: 50%;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  animation: twinkle 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  animation-play-state: ${props => props.isPaused ? 'paused' : 'running'};
  opacity: 0.7;
  filter: brightness(0.7);
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.5);
    }
  }
`;

interface Star {
  id: number;
  x: number;
  y: number;
  angle: number;
  opacity: number;
}

export const Hero = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [buttonStars, setButtonStars] = useState<ButtonStar[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const starIdRef = useRef(0);
  const buttonStarIdRef = useRef(0);

  const backgroundStars = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  const createButtonStarRays = () => {
    const rays: ButtonStar[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i * 18); // 360 degrees / 20 rays = 18 degrees each
      const delay = i * 0.05; // Stagger the animation
      rays.push({
        id: buttonStarIdRef.current++,
        angle,
        delay
      });
    }
    setButtonStars(rays);
    
    // Clear stars after animation
    setTimeout(() => {
      setButtonStars([]);
    }, 1000);
  };

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
    setStars([]); // Clear any existing star trails
    setIsMouseInSection(false); // Stop mouse tracking
    createButtonStarRays();
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
    setButtonStars([]);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const button = buttonRef.current;
    
    if (!section || !button) return;

    let mouseThrottle: number;
    let lastStarTime = 0;
    const STAR_INTERVAL = 200; // Time between star sequences
    let isCreatingSequence = false;

    const handleMouseMove = (e: MouseEvent) => {
      // Don't track mouse if button is hovered
      if (isButtonHovered) return;
      
      // Throttle mouse movement for optimal performance
      if (mouseThrottle) return;
      
      mouseThrottle = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const newPosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        
        setMousePosition(newPosition);
        
        // Create star sequence only if enough time has passed and not already creating
        const now = Date.now();
        if (isMouseInSection && now - lastStarTime > STAR_INTERVAL && !isCreatingSequence) {
          createStarSequence(newPosition);
          lastStarTime = now;
        }
        
        mouseThrottle = 0;
      });
    };

    const handleMouseEnter = () => {
      if (!isButtonHovered) {
        setIsMouseInSection(true);
      }
    };

    const handleMouseLeave = () => {
      setIsMouseInSection(false);
      setStars([]);
    };

    const createStarSequence = (position: { x: number; y: number }) => {
      if (!button || isButtonHovered) return;

      isCreatingSequence = true;
      const buttonRect = button.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      
      const buttonCenterX = buttonRect.left - sectionRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top - sectionRect.top + buttonRect.height / 2;
      
      const dx = buttonCenterX - position.x;
      const dy = buttonCenterY - position.y;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      // Create 5 stars simultaneously
      const newStars: Star[] = [];
      for (let i = 0; i < 5; i++) {
        newStars.push({
          id: starIdRef.current++,
          x: position.x,
          y: position.y,
          angle,
          opacity: 1
        });
      }

      // Add all stars at once
      setStars(prev => {
        const updatedStars = [...prev, ...newStars];
        if (updatedStars.length > 15) {
          return updatedStars.slice(-15);
        }
        return updatedStars;
      });

      // Remove stars one after another
      newStars.forEach((star, index) => {
        setTimeout(() => {
          setStars(prev => prev.filter(s => s.id !== star.id));
        }, 800 + (index * 200)); // 800ms base + 200ms delay per star
      });

      // Reset sequence flag after all stars are created
      setTimeout(() => {
        isCreatingSequence = false;
      }, 500);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (mouseThrottle) cancelAnimationFrame(mouseThrottle);
    };
  }, [isMouseInSection, isButtonHovered]);

  return (
    <HeroSection ref={sectionRef}>
      <FloatingStars isPaused={isButtonHovered}>
        {backgroundStars.map((star, index) => (
          <Star 
            key={index} 
            x={star.x} 
            y={star.y} 
            delay={star.delay} 
            isPaused={isButtonHovered}
          />
        ))}
      </FloatingStars>
      {!isButtonHovered && stars.map(star => (
        <StarTrail
          key={star.id}
          x={star.x}
          y={star.y}
          angle={star.angle}
          style={{
            opacity: star.opacity,
            animation: 'starTrail 1s linear forwards'
          }}
        />
      ))}
      {buttonStars.map(star => (
        <ButtonStarRay
          key={star.id}
          angle={star.angle}
          delay={star.delay}
        />
      ))}
      <HeroContent className="fade-in-up">
        <TextContainer>
          <HeroTitle>Fast, secure, open-source authentication.</HeroTitle>
          <HeroSubtitle>Do auth in minutes.</HeroSubtitle>
        </TextContainer>
        <ButtonContainer>
          <HeroButton 
            ref={buttonRef}
            onClick={() => document.getElementById('quickstart')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Get Started →
          </HeroButton>
        </ButtonContainer>
        <TestimonialSlider />

      </HeroContent>
      
      <style>
        {`
          @keyframes starTrail {
            0% {
              opacity: 1;
              transform: scale(1) rotate(${stars[0]?.angle || 0}deg);
            }
            100% {
              opacity: 0;
              transform: scale(0.5) rotate(${stars[0]?.angle || 0}deg) translateX(100px);
            }
          }
          
          @keyframes buttonStarRay {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(0);
            }
            50% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(1.5);
            }
          }
        `}
      </style>
    </HeroSection>
  );
}; 