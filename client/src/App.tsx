import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Task } from './models/Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('smartplan-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
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
  };

  // Toggle task completion status
  const handleToggleComplete = (taskId: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  return (
    <Layout>
      <TaskInput onTasksGenerated={handleTasksGenerated} />
      <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />
    </Layout>
  );
}

export default App;
