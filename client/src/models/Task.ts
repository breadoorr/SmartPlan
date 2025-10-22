export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

export interface TasksResponse {
  tasks: Task[];
}