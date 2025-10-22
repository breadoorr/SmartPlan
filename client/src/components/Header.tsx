import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  color: #f5f7fa;
  font-size: 1.8rem;
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  opacity: 0.8;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>SmartPlan</Title>
      <Subtitle>AI-Powered Task Planning</Subtitle>
    </HeaderContainer>
  );
};

export default Header;