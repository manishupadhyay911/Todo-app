export interface Task {
    _id?: string;
    description: string;
    dueDate?: Date;
    status: 'pending' | 'completed';
    tags?: string[];
  }
  