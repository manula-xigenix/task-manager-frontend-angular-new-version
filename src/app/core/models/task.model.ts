import { User } from './user.model';

export enum TaskStatus {
  ToDo = 1,
  InProgress = 2,
  Completed = 3
}

export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: TaskStatus;   
  dueDate?: string;
  user?: User; 
}
