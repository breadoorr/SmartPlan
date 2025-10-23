import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Calendar from './Calendar';
import DayTasks from './DayTasks';
import TaskModal from './TaskModal';
import ExportCalendar from './ExportCalendar';
import { Task } from '../models/Task';

const TaskAppContainer = styled.div`
  width: 100%;
`;

const AppLayout = styled.div<{ isTasksGenerated: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.isTasksGenerated ? '1fr 1fr' : '1fr'};
  gap: 2rem;
  transition: all 0.5s ease-in-out;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div<{ isVisible: boolean }>`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateX(0)' : 'translateX(-20px)'};
  transition: all 0.5s ease-in-out;
  transition-delay: 0.2s;
`;

const RightColumn = styled.div<{ isTasksGenerated: boolean }>`
  transition: all 0.5s ease-in-out;
  width: 100%;
  transform: ${props => props.isTasksGenerated ? 'translateX(0)' : 'translateX(0)'};
`;

const TaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isTasksGenerated, setIsTasksGenerated] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('smartplan-tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
        setIsTasksGenerated(parsedTasks.length > 0);
      } catch (error) {
        console.error('Error loading saved tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smartplan-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle tasks generated from user input
  const handleTasksGenerated = (newTasks: Task[]) => {
    setTasks(newTasks);
    setIsTasksGenerated(true);
  };

  // Toggle task completion status
  const handleToggleComplete = (taskId: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Open task modal for editing
  const handleOpenTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  
  // Close task modal
  const handleCloseTaskModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  
  // Save edited task
  const handleSaveTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <TaskAppContainer>
      <AppLayout isTasksGenerated={isTasksGenerated}>
        {isTasksGenerated && (
          <LeftColumn isVisible={isTasksGenerated}>
            <Calendar 
              selectedDate={selectedDate} 
              onDateSelect={handleDateSelect} 
            />
            <DayTasks 
              tasks={tasks} 
              selectedDate={selectedDate} 
              onToggleComplete={handleToggleComplete}
              onTaskClick={handleOpenTaskModal}
            />
            <ExportCalendar tasks={tasks} />
          </LeftColumn>
        )}
        
        <RightColumn isTasksGenerated={isTasksGenerated}>
          <TaskInput onTasksGenerated={handleTasksGenerated} />
          {!isTasksGenerated && (
            <TaskList 
              tasks={tasks} 
              onToggleComplete={handleToggleComplete}
              onTaskClick={handleOpenTaskModal}
            />
          )}
        </RightColumn>
      </AppLayout>
      
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseTaskModal}
        onSave={handleSaveTask}
      />
    </TaskAppContainer>
  );
};

export default TaskApp;