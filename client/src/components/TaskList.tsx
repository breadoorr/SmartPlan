import React from 'react';
import styled from 'styled-components';
import TaskItem from './TaskItem';
import { Task } from '../models/Task';

const TaskListContainer = styled.div`
  margin-top: 2rem;
`;

const TaskListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TaskListTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const TaskCount = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
  background-color: #ecf0f1;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #7f8c8d;
`;

const EmptyStateIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  margin: 0;
  font-size: 1.1rem;
`;

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <TaskListContainer>
      <TaskListHeader>
        <TaskListTitle>Your Tasks</TaskListTitle>
        {tasks.length > 0 && (
          <TaskCount>
            {completedCount}/{tasks.length} completed
          </TaskCount>
        )}
      </TaskListHeader>
      
      {tasks.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>📋</EmptyStateIcon>
          <EmptyStateText>
            No tasks yet. Describe your project above to generate a task plan.
          </EmptyStateText>
        </EmptyState>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggleComplete={onToggleComplete} 
          />
        ))
      )}
    </TaskListContainer>
  );
};

export default TaskList;