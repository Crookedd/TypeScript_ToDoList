export interface Task {
    id: string;
    title: string;
    description: string;
    pinned: boolean;
  }
  
  export interface RootState {
    tasks: {
      tasks: Task[];
    };
  }
  