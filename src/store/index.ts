import { create } from "zustand";

import { createTodoSlice, TodoSlice } from "./todo/todoStore";

export const useStore = create<TodoSlice>((...a) => ({
  ...createTodoSlice(...a),
}));
