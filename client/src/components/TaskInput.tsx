import React, { useState } from 'react';
import styled from 'styled-components';
import { generateTasks } from '../services/api';
import { Task } from '../models/Task';

const InputContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  margin-bottom: 1rem;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-end;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #7f8c8d;
`;

interface TaskInputProps {
  onTasksGenerated: (tasks: Task[]) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onTasksGenerated }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateTasks(userInput);
      onTasksGenerated(response.tasks);
      setUserInput('');
    } catch (err) {
      setError('Failed to generate tasks. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InputContainer>
      <Title>Describe Your Project</Title>
      <Form onSubmit={handleSubmit}>
        <TextArea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe your project or goal (e.g., 'Create a company website with blog and contact form')"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !userInput.trim()}>
          {isLoading ? 'Generating...' : 'Generate Tasks'}
        </Button>
      </Form>
      
      {isLoading && <LoadingIndicator>Generating your task plan...</LoadingIndicator>}
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
    </InputContainer>
  );
};

export default TaskInput;