import React from 'react';
import styled from 'styled-components';
import { format, formatISO } from 'date-fns'; // Импортируем formatISO для URL
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
  justify-content: space-between; /* Изменено для разделения чекбокса и кнопки */
  align-items: center;
  margin-top: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
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

// Новый стилизованный компонент кнопки
const CalendarButton = styled.a`
  background-color: #f39c12; /* Оранжевый цвет Google Календаря */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none; /* Убираем подчеркивание для ссылки */
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e67e22;
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

  // 1. Функция для создания URL-адреса Google Календаря
  const createGoogleCalendarUrl = (task: Task): string => {
    // Google Calendar ожидает даты и времени в формате YYYYMMDDTHHMMSSZ (UTC)
    // formatISO с опцией { representation: 'complete' } дает формат ISO 8601 (например, 2025-10-23T00:00:00.000Z).
    // Мы удаляем символы, которые Google Календарь не любит в дате/времени (-, :, .) и 'Z'
    
    // Устанавливаем время начала и конца дня, если в задаче не указано время
    const start = new Date(task.startDate);
    start.setHours(9, 0, 0, 0); // Начало в 9:00
    
    const end = new Date(task.endDate);
    end.setHours(10, 0, 0, 0); // Окончание в 10:00 (для простой задачи)

    // Форматируем даты для Google Календаря
    const formatCalendarDate = (date: Date) => {
      return format(date, "yyyyMMdd'T'HHmmss");
    };

    const startTime = formatCalendarDate(start);
    const endTime = formatCalendarDate(end);

    // Экранирование заголовка и описания
    const title = encodeURIComponent(task.title);
    const details = encodeURIComponent(task.description);
    
    // Базовый URL для добавления события
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';

    // Собираем URL
    const url = `${baseUrl}&text=${title}&dates=${startTime}/${endTime}&details=${details}&sf=true&output=xml`;
    
    return url;
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
        <CheckboxContainer>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              checked={task.completed} 
              onChange={handleToggleComplete}
            />
            {task.completed ? 'Completed' : 'Mark as completed'}
          </CheckboxLabel>
        </CheckboxContainer>
        
        {/* 2. Добавляем кнопку экспорта */}
        <CalendarButton
          href={createGoogleCalendarUrl(task)}
          target="_blank"
          rel="noopener noreferrer"
        >
          📅 Export to Calendar
        </CalendarButton>
      </TaskActions>
    </TaskCard>
  );
};

export default TaskItem;