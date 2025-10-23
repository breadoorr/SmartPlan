import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Link)`
  margin: 0;
  color: #f5f7fa;
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    color: #f5f7fa;
    opacity: 0.9;
  }
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  opacity: 0.8;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)<{ active: boolean }>`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isApp = location.pathname === '/app';
  
  return (
    <HeaderContainer>
      <LogoContainer>
        <Title to="/">SmartPlan</Title>
        <Subtitle>AI-Powered Task Planning</Subtitle>
      </LogoContainer>
      
      <Nav>
        <NavLink to="/" active={isHome}>Home</NavLink>
        <NavLink to="/app" active={isApp}>App</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;