import { User } from './user.model';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
  user?: User; 
}
