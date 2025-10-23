import React from 'react';
import styled from 'styled-components';
import { Task } from '../models/Task';

const ExportContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ExportTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const ExportDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const GoogleButton = styled(ExportButton)`
  background-color: #4285F4;
  
  &:hover {
    background-color: #3367D6;
  }
`;

const OutlookButton = styled(ExportButton)`
  background-color: #0078D4;
  
  &:hover {
    background-color: #106EBE;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.2rem;
`;

interface ExportCalendarProps {
  tasks: Task[];
}

const ExportCalendar: React.FC<ExportCalendarProps> = ({ tasks }) => {
  // Function to export tasks to Google Calendar
  const exportToGoogleCalendar = () => {
    if (tasks.length === 0) {
      alert('No tasks to export. Please generate tasks first.');
      return;
    }
    
    // Create Google Calendar events for each task
    const events = tasks.map(task => {
      // Format dates for Google Calendar URL
      const startDate = new Date(task.startDate + 'T' + task.startTime.split('T')[1]?.split('.')[0] || '09:00:00');
      const endDate = new Date(task.endDate + 'T' + task.endTime.split('T')[1]?.split('.')[0] || '10:00:00');
      
      // Format dates for Google Calendar URL
      const startDateTime = startDate.toISOString().replace(/-|:|\.\d+/g, '');
      const endDateTime = endDate.toISOString().replace(/-|:|\.\d+/g, '');
      
      // Create Google Calendar URL for this event
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(task.title)}&details=${encodeURIComponent(task.description)}&dates=${startDateTime}/${endDateTime}`;
    });
    
    // Open each event URL in a new tab
    events.forEach(eventUrl => {
      window.open(eventUrl, '_blank');
    });
  };
  
  // Function to export tasks to Outlook Calendar
  const exportToOutlookCalendar = () => {
    if (tasks.length === 0) {
      alert('No tasks to export. Please generate tasks first.');
      return;
    }
    
    // Create Outlook Calendar events for each task
    const events = tasks.map(task => {
      // Format dates for Outlook Calendar URL
      const startDate = new Date(task.startDate + 'T' + task.startTime.split('T')[1]?.split('.')[0] || '09:00:00');
      const endDate = new Date(task.endDate + 'T' + task.endTime.split('T')[1]?.split('.')[0] || '10:00:00');
      
      // Format dates for Outlook Calendar URL
      const startDateTime = startDate.toISOString();
      const endDateTime = endDate.toISOString();
      
      // Create Outlook Calendar URL for this event
      return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(task.title)}&body=${encodeURIComponent(task.description)}&startdt=${startDateTime}&enddt=${endDateTime}`;
    });
    
    // Open each event URL in a new tab
    events.forEach(eventUrl => {
      window.open(eventUrl, '_blank');
    });
  };
  
  return (
    <ExportContainer>
      <ExportTitle>Export Tasks to Calendar</ExportTitle>
      <ExportDescription>
        Export your tasks to Google Calendar or Microsoft Outlook to keep track of your project timeline.
      </ExportDescription>
      
      <ButtonGroup>
        <GoogleButton onClick={exportToGoogleCalendar}>
          <ButtonIcon>📅</ButtonIcon>
          Export to Google Calendar
        </GoogleButton>
        
        <OutlookButton onClick={exportToOutlookCalendar}>
          <ButtonIcon>📅</ButtonIcon>
          Export to Outlook
        </OutlookButton>
      </ButtonGroup>
    </ExportContainer>
  );
};

export default ExportCalendar;