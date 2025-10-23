import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LandingContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
`;

const Hero = styled.section`
  background-color: #2c3e50;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #3498db;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const HowItWorksSection = styled.section`
  padding: 5rem 2rem;
  background-color: #ecf0f1;
`;

const StepsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StepNumber = styled.div`
  background-color: #3498db;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const StepDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  background-color: #2c3e50;
  color: white;
  margin-top: auto;
`;

const LandingPage: React.FC = () => {
  return (
    <LandingContainer>
      <Hero>
        <HeroTitle>SmartPlan</HeroTitle>
        <HeroSubtitle>
          AI-Powered Task Planning to Transform Your Projects
        </HeroSubtitle>
        <CTAButton to="/app">Get Started Now</CTAButton>
      </Hero>
      
      <FeaturesSection>
        <SectionTitle>Why Choose SmartPlan?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle>AI-Powered Planning</FeatureTitle>
            <FeatureDescription>
              Our advanced AI analyzes your project description and creates a detailed, 
              time-based task roadmap tailored to your specific needs.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>⏱️</FeatureIcon>
            <FeatureTitle>Save Time</FeatureTitle>
            <FeatureDescription>
              What would take hours of manual planning can now be done in seconds. 
              Focus on execution, not planning.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Visual Calendar</FeatureTitle>
            <FeatureDescription>
              See your tasks organized in a clear, visual calendar that helps you 
              understand your project timeline at a glance.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Describe Your Project</StepTitle>
              <StepDescription>
                Simply enter a description of your project or goal. The more details you provide, 
                the more accurate your task plan will be.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>AI Generates Your Tasks</StepTitle>
              <StepDescription>
                Our AI analyzes your description and creates a comprehensive set of tasks 
                with realistic timeframes and dependencies.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Manage Your Calendar</StepTitle>
              <StepDescription>
                View your tasks in a calendar format, track your progress, and adjust as needed. 
                SmartPlan makes project management simple and effective.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsContainer>
      </HowItWorksSection>
      
      <Footer>
        &copy; {new Date().getFullYear()} SmartPlan - AI-Powered Task Planning
      </Footer>
    </LandingContainer>
  );
};

export default LandingPage;