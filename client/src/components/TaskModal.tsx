import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Task } from '../models/Task';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  
  &:hover {
    color: #34495e;
  }
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TimeInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const DateInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const SaveButton = styled(Button)`
  background-color: #3498db;
  color: white;
  border: none;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: #7f8c8d;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TimeGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const DateGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  
  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);
  
  if (!isOpen || !editedTask) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'startTime' | 'endTime') => {
    const timeValue = e.target.value;
    if (editedTask) {
      // Extract date part from the existing datetime string
      const datePart = editedTask[field].split('T')[0];
      // Combine with new time value
      const newDateTime = `${datePart}T${timeValue}:00.000Z`;
      setEditedTask({ ...editedTask, [field]: newDateTime });
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'startDate' | 'endDate') => {
    const dateValue = e.target.value;
    setEditedTask(prev => prev ? { ...prev, [field]: dateValue } : null);
  };
  
  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
      onClose();
    }
  };
  
  // Extract time from datetime string (format: "HH:MM")
  const extractTime = (dateTimeString: string): string => {
    try {
      return dateTimeString.split('T')[1]?.split('.')[0]?.substring(0, 5) || '';
    } catch (error) {
      return '';
    }
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <ModalHeader>
          <ModalTitle>Edit Task</ModalTitle>
        </ModalHeader>
        
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Date</Label>
          <DateGroup>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <DateInput
                id="startDate"
                type="date"
                value={editedTask.startDate}
                onChange={(e) => handleDateChange(e, 'startDate')}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <DateInput
                id="endDate"
                type="date"
                value={editedTask.endDate}
                onChange={(e) => handleDateChange(e, 'endDate')}
              />
            </div>
          </DateGroup>
        </FormGroup>
        
        <FormGroup>
          <Label>Time</Label>
          <TimeGroup>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <TimeInput
                id="startTime"
                type="time"
                value={extractTime(editedTask.startTime)}
                onChange={(e) => handleTimeChange(e, 'startTime')}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <TimeInput
                id="endTime"
                type="time"
                value={extractTime(editedTask.endTime)}
                onChange={(e) => handleTimeChange(e, 'endTime')}
              />
            </div>
          </TimeGroup>
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save Changes</SaveButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TaskModal;