import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  format, 
  addDays, 
  addMonths, 
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  parseISO 
} from 'date-fns';

const CalendarContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CalendarTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const NavigationButton = styled.button`
  background-color: transparent;
  border: none;
  color: #3498db;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ecf0f1;
  }
  
  &:focus {
    outline: none;
  }
`;

const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TodayButton = styled.button`
  background-color: transparent;
  border: 1px solid #3498db;
  color: #3498db;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  color: #7f8c8d;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0.5rem 0;
`;

const DayCell = styled.div<{ 
  isToday: boolean; 
  isSelected: boolean; 
  isCurrentMonth: boolean;
}>`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: ${props => props.isToday || props.isSelected ? 'bold' : 'normal'};
  background-color: ${props => {
    if (props.isSelected) return '#3498db';
    if (props.isToday) return '#ecf0f1';
    return 'transparent';
  }};
  color: ${props => {
    if (props.isSelected) return 'white';
    if (!props.isCurrentMonth) return '#bdc3c7';
    return '#34495e';
  }};
  opacity: ${props => props.isCurrentMonth ? 1 : 0.6};
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#3498db' : '#ecf0f1'};
  }
`;

const TasksForDay = styled.div`
  margin-top: 1.5rem;
`;

const TasksForDayTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
`;

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));
  
  // Navigation functions
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(startOfMonth(today));
    onDateSelect(today);
  };
  
  // Get all days to display in the month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  // Create array of days
  const dateArray = [];
  let day = startDate;
  
  while (day <= endDate) {
    dateArray.push(day);
    day = addDays(day, 1);
  }
  
  // Day names for the header
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>{format(currentMonth, 'MMMM yyyy')}</CalendarTitle>
        <NavigationControls>
          <TodayButton onClick={goToToday}>Today</TodayButton>
          <NavigationButton onClick={prevMonth}>&lt;</NavigationButton>
          <NavigationButton onClick={nextMonth}>&gt;</NavigationButton>
        </NavigationControls>
      </CalendarHeader>
      
      <MonthGrid>
        {dayNames.map(name => (
          <DayHeader key={name}>{name}</DayHeader>
        ))}
        
        {dateArray.map(date => (
          <DayCell
            key={date.toString()}
            isToday={isSameDay(date, new Date())}
            isSelected={isSameDay(date, selectedDate)}
            isCurrentMonth={isSameMonth(date, currentMonth)}
            onClick={() => onDateSelect(date)}
          >
            {format(date, 'd')}
          </DayCell>
        ))}
      </MonthGrid>
      
      <TasksForDay>
        <TasksForDayTitle>
          Tasks for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </TasksForDayTitle>
      </TasksForDay>
    </CalendarContainer>
  );
};

export default Calendar;