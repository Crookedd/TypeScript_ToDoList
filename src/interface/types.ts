export interface Task {
    id: string;
    title: string;
    description: string;
  }
  
  export interface RootState {
    tasks: {
      tasks: Task[];
    };
  }
  