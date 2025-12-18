export interface WorkflowUser {
  id: string;
  email: string;
  createdAt?: Date;
}

export interface WorkflowResult {
  success: boolean;
  userId?: string;
  message?: string;
  error?: string;
  retry?: boolean;
}

export interface WorkflowStep {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  error?: string;
}
