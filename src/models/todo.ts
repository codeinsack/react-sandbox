import { TodoStatus } from "./TodoStatus";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  status?: TodoStatus;
}
