import React from "react";
import { List } from "@mui/material";

import TodoItem from "./TodoItem/TodoItem";
import { useStore } from "../../../store";

const TodoList = () => {
  const { todos } = useStore();

  return (
    <List>
      {todos.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </List>
  );
};

export default TodoList;
