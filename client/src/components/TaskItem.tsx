import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Task } from '../models/Task';

const TaskCard = styled.div<{ completed: boolean }>`
  background-color: white;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => props.completed ? '#27ae60' : '#3498db'};
  opacity: ${props => props.completed ? 0.8 : 1};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const TaskTitle = styled.h3<{ completed: boolean }>`
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  flex: 1;
  padding-right: 1rem;
`;

const TaskDates = styled.div`
  font-size: 0.85rem;
  color: #7f8c8d;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TaskDescription = styled.p<{ completed: boolean }>`
  margin: 0.5rem 0;
  color: #34495e;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: ${props => props.completed ? 0.7 : 1};
`;

const TaskActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
  width: 18px;
  height: 18px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #7f8c8d;
  cursor: pointer;
  
  &:hover {
    color: #34495e;
  }
`;

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  return (
    <TaskCard completed={task.completed}>
      <TaskHeader>
        <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
        <TaskDates>
          <div>Start: {formatDate(task.startDate)}</div>
          <div>End: {formatDate(task.endDate)}</div>
        </TaskDates>
      </TaskHeader>
      
      <TaskDescription completed={task.completed}>
        {task.description}
      </TaskDescription>
      
      <TaskActions>
        <CheckboxLabel>
          <Checkbox 
            type="checkbox" 
            checked={task.completed} 
            onChange={handleToggleComplete}
          />
          {task.completed ? 'Completed' : 'Mark as completed'}
        </CheckboxLabel>
      </TaskActions>
    </TaskCard>
  );
};

export default TaskItem;