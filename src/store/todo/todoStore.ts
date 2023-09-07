import { Todo } from "../../models/todo";
import { StateCreator } from "zustand";
import api from "../../api/agent";
import { Filter } from "../../models/filter";
import { debounce } from "lodash";

export interface TodoSlice {
  todo: Todo | null;
  todos: Todo[];
  fetchTodos: (filter?: Filter) => void;
  fetchTodo: (id: number) => void;
  addTodo: (title: string) => void;
  updateTodo: (updatedItem: Todo, prop: keyof Todo) => void;
  updateWholeTodo: (updatedItem: Todo) => void;
  deleteTodo: (id: number) => void;
}

export const createTodoSlice: StateCreator<TodoSlice> = (set) => ({
  todo: null,
  todos: [],
  fetchTodos: debounce(async (filter?: Filter) => {
    const list = await api.Items.list(filter);
    set({ todos: list });
  }, 300),
  fetchTodo: async (id: number) => {
    const todoDetails = await api.Items.details(id);
    set({ todo: todoDetails });
  },
  addTodo: async (title: string) => {
    const todo: Todo = {
      id: Math.random(),
      title,
      isCompleted: false,
    };
    await api.Items.create(todo);
    set(({ todos }) => ({
      todos: todos.concat(todo),
    }));
  },
  updateTodo: async (updatedItem: Todo, prop: keyof Todo) => {
    await api.Items.update({
      id: updatedItem.id,
      [prop]: updatedItem[prop],
    });
    set(({ todos }) => ({
      todos: todos.map((item) =>
        updatedItem.id === item.id ? updatedItem : item
      ),
    }));
  },
  updateWholeTodo: async (updatedItem: Todo) => {
    await api.Items.update(updatedItem);
    set(({ todos }) => ({
      todos: todos.map((item) =>
        updatedItem.id === item.id ? updatedItem : item
      ),
    }));
  },
  deleteTodo: async (id: number) => {
    await api.Items.delete(id);
    set(({ todos }) => ({
      todos: todos.filter((item) => item.id !== id),
    }));
  },
});
