import React from 'react';
import styled from 'styled-components';
import { format, isSameDay, parseISO } from 'date-fns';
import { Task } from '../models/Task';

const DayTasksContainer = styled.div`
  margin-top: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TaskTimelineWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #bdc3c7;
    border-radius: 8px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #95a5a6;
  }
`;

const TaskTimeline = styled.div`
  position: relative;
  padding-left: 60px; /* Space for time labels */
  margin-top: 0.5rem;
  padding-bottom: 1rem;
`;

const TimeLabel = styled.div`
  position: absolute;
  left: 0;
  width: 50px;
  text-align: right;
  color: #7f8c8d;
  font-size: 0.75rem;
  padding-right: 8px;
  height: 20px;
  line-height: 20px;
`;

const TimeSlot = styled.div`
  height: 40px; /* Reduced height for more compact view */
  border-top: 1px solid #ecf0f1;
  position: relative;
`;

const TaskItem = styled.div<{ duration: number; startMinute: number }>`
  position: absolute;
  left: 10px;
  right: 10px;
  top: ${props => props.startMinute / 60 * 40}px; /* Adjusted for new time slot height */
  height: ${props => Math.max(props.duration / 60 * 40, 20)}px; /* Adjusted for new time slot height with minimum */
  background-color: #3498db;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  color: white;
  font-size: 0.85rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #2980b9;
    transform: translateX(5px);
  }
`;

const TaskTitle = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.85rem;
`;

const TaskTime = styled.div`
  font-size: 0.75rem;
  opacity: 0.9;
  margin-top: 0.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 0;
`;

const TimelineHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
  font-weight: bold;
  color: #2c3e50;
`;

interface DayTasksProps {
  tasks: Task[];
  selectedDate: Date;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onTaskClick: (task: Task) => void;
}

const DayTasks: React.FC<DayTasksProps> = ({ tasks, selectedDate, onToggleComplete, onTaskClick }) => {
  // Filter tasks for the selected day
  const tasksForDay = tasks.filter(task => {
    try {
      const taskDate = parseISO(task.startDate);
      return isSameDay(taskDate, selectedDate);
    } catch (error) {
      return false;
    }
  });
  
  // Generate time slots for the day (hourly)
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);
  
  // Helper function to parse time string to minutes since midnight
  const parseTimeToMinutes = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    } catch (error) {
      return 0;
    }
  };
  
  // Helper function to calculate task duration in minutes
  const calculateDuration = (startTime: string, endTime: string) => {
    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);
    return endMinutes - startMinutes;
  };
  
  return (
    <DayTasksContainer>
      <TimelineHeader>
        Tasks for {format(selectedDate, 'EEEE, MMMM d')}
      </TimelineHeader>
      
      {tasksForDay.length > 0 ? (
        <TaskTimelineWrapper>
          <TaskTimeline>
            {timeSlots.map(hour => (
              <React.Fragment key={hour}>
                <TimeLabel>{hour === 0 ? '12a' : hour < 12 ? `${hour}a` : hour === 12 ? '12p' : `${hour - 12}p`}</TimeLabel>
                <TimeSlot />
              </React.Fragment>
            ))}
            
            {tasksForDay.map(task => {
              // Extract hours and minutes from startTime
              const startMinutes = parseTimeToMinutes(task.startTime.split('T')[1]?.split('.')[0]?.substring(0, 5) || '09:00');
              const duration = calculateDuration(
                task.startTime.split('T')[1]?.split('.')[0]?.substring(0, 5) || '09:00',
                task.endTime.split('T')[1]?.split('.')[0]?.substring(0, 5) || '10:00'
              );
              
              return (
                <TaskItem 
                  key={task.id}
                  startMinute={startMinutes}
                  duration={Math.max(duration, 30)} // Minimum height for visibility
                  onClick={() => onTaskClick(task)}
                >
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskTime>
                    {task.startTime.split('T')[1]?.split('.')[0]?.substring(0, 5) || '09:00'} - 
                    {task.endTime.split('T')[1]?.split('.')[0]?.substring(0, 5) || '10:00'}
                  </TaskTime>
                </TaskItem>
              );
            })}
          </TaskTimeline>
        </TaskTimelineWrapper>
      ) : (
        <EmptyState>
          No tasks scheduled for this day. Generate tasks or select another day.
        </EmptyState>
      )}
    </DayTasksContainer>
  );
};

export default DayTasks;