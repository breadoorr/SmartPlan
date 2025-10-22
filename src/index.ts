import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define Task interface
interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

// API endpoints
app.post('/api/generate-tasks', async (req, res) => {
  try {
    const { userInput } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required' });
    }
    
    // Step 1: Structure the user input
    const structureResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that structures user input for task planning."
        },
        {
          role: "user",
          content: `Structure the following project description for task planning: ${userInput}`
        }
      ],
    });
    
    const structuredInput = structureResponse.choices[0].message.content;
    
    // Step 2: Generate tasks based on structured input
    const tasksResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a project planning assistant. Generate a JSON array of tasks with the following structure:
          [
            {
              "id": "unique-id",
              "title": "Task title",
              "description": "Task description",
              "startDate": "YYYY-MM-DD",
              "endDate": "YYYY-MM-DD",
              "completed": false
            }
          ]
          
          The tasks should form a logical roadmap for completing the project. Use realistic timeframes.`
        },
        {
          role: "user",
          content: `Based on this structured project description, generate a detailed task roadmap: ${structuredInput}`
        }
      ],
    });
    
    // Parse the response to get the tasks
    const tasksContent = tasksResponse.choices[0].message.content;
    let tasks: Task[] = [];
    
    if (!tasksContent) {
      console.error('No content received from OpenAI API');
      return res.status(500).json({ error: 'Failed to get response from AI' });
    }
    
    try {
      // Extract JSON array from the response
      const jsonMatch = tasksContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        tasks = JSON.parse(jsonMatch[0]);
      } else {
        tasks = JSON.parse(tasksContent);
      }
    } catch (error) {
      console.error('Error parsing tasks:', error);
      return res.status(500).json({ error: 'Failed to parse tasks from AI response' });
    }
    
    res.json({ tasks });
  } catch (error) {
    console.error('Error generating tasks:', error);
    res.status(500).json({ error: 'Failed to generate tasks' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
