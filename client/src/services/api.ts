import axios from 'axios';
import { TasksResponse } from '../models/Task';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateTasks = async (userInput: string): Promise<TasksResponse> => {
  try {
    const response = await api.post<TasksResponse>('/api/generate-tasks', { userInput });
    return response.data;
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
};

export default api;