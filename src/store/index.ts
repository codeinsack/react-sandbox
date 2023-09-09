import { create } from "zustand";

import { createTodoSlice, TodoSlice } from "./todo/todoStore";
import { createUserSlice, UserSlice } from "./user/userStore";

export const useStore = create<TodoSlice & UserSlice>((...a) => ({
  ...createTodoSlice(...a),
  ...createUserSlice(...a),
}));
