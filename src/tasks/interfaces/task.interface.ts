import { Document } from 'mongoose';

export interface Task extends Document {
  description: string;
  completed: boolean;
  userId: string;
}
