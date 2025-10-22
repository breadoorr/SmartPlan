import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Content = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 2rem;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>{children}</Content>
      <Footer>
        &copy; {new Date().getFullYear()} SmartPlan - AI-Powered Task Planning
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;