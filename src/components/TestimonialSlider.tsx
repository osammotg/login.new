import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

const SliderWrapper = styled.section`
  overflow: hidden;
  padding: 3rem 0;
  background: transparent;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.colors.border}, transparent);
  }
`

const Row = styled.div<{ reverse?: boolean }>`
  display: flex;
  gap: 1rem;
  animation: scroll 20s linear infinite;
  animation-direction: ${props => props.reverse ? 'reverse' : 'normal'};
  margin-bottom: 1rem;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  
  &:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`

const Card = styled.article`
  width: 280px;
  min-height: 120px;
  border: 1px solid rgba(140, 94, 255, 0.25);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 1.25rem;
  color: #E0E0E0;
  font-size: 0.9rem;
  line-height: 1.4;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(140, 94, 255, 0.5);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 94, 255, 0.1);
  }
`

const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 0.75rem;
`

const Star = styled.span`
  color: #FBBF24;
  font-size: 1rem;
`

const Quote = styled.p`
  margin: 0;
  font-style: italic;
`

const testimonials = [
  "Clicked three buttons and BOOM—Google login live in 2 min!",
  "I avoided auth for years; Stack-Auth made it fun.",
  "From zero to production-ready auth before my coffee cooled ☕.",
  "Lazy dev? Same. Stack-Auth saved me hours.",
  "Keeping it forever—best decision of this project.",
  "OAuth, OTP, email-magic—done in minutes."
]

// Duplicate the array to ensure smooth infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

const TestimonialCard: React.FC<{ quote: string }> = ({ quote }) => (
  <Card>
    <StarsContainer>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i}>★</Star>
      ))}
    </StarsContainer>
    <Quote>"{quote}"</Quote>
  </Card>
)

export const TestimonialSlider: React.FC = () => {
  return (
    <SliderWrapper>
      <Row>
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={`row-a-${index}`} quote={testimonial} />
        ))}
      </Row>
      <Row reverse>
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={`row-b-${index}`} quote={testimonial} />
        ))}
      </Row>
    </SliderWrapper>
  )
} 