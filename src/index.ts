import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini (Vertex AI)
const ai = new GoogleGenAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});
// Define Task interface (for clarity)
interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

// --- API ENDPOINT ---
app.post('/api/generate-tasks', async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required' });
    }

    // STEP 1: Structure the user input
    const structureResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Structure the following project description for task planning: ${userInput}`,
            },
          ],
        },
      ],
    });

    const structuredInput =
        structureResponse?.text?.trim();

    if (!structuredInput) {
      return res.status(500).json({ error: 'Failed to structure input using Gemini' });
    }

    // STEP 2: Generate the task list
    const tasksResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
                You are a project planning assistant. Generate a JSON array of tasks with this structure:
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
                
                The tasks should form a logical roadmap for completing the project. Use realistic timeframes.
                Based on this structured project description:
                ${structuredInput}
              `,
            },
          ],
        },
      ],
    });

    const tasksContent =
        tasksResponse?.text?.trim();

    if (!tasksContent) {
      console.error('No content received from Gemini API');
      return res.status(500).json({ error: 'No response from Gemini' });
    }

    // Parse JSON array of tasks
    let tasks: Task[] = [];
    try {
      const jsonMatch = tasksContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        tasks = JSON.parse(jsonMatch[0]);
      } else {
        tasks = JSON.parse(tasksContent);
      }
    } catch (error) {
      console.error('Error parsing tasks JSON:', error);
      return res.status(500).json({ error: 'Failed to parse Gemini response as JSON' });
    }

    res.json({ tasks });
  } catch (error) {
    console.error('Error generating tasks:', error);
    res.status(500).json({ error: 'Failed to generate tasks' });
  }
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
