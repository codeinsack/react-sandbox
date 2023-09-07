import React, { useEffect } from "react";

import TodoList from "./TodoList/TodoList";
import TodoFilter from "./TodoFilter/TodoFilter";
import AddTodoItem from "./AddTodoItem/AddTodoItem";
import { Stack } from "@mui/material";
import { useStore } from "../../store";

const TodoDashboard = () => {
  const { fetchTodos } = useStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <Stack spacing={2}>
      <AddTodoItem />
      <TodoFilter />
      <TodoList />
    </Stack>
  );
};

export default TodoDashboard;
