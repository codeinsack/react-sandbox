import React, { KeyboardEvent, useState } from "react";

import { TextField } from "@mui/material";
import { useStore } from "../../../store";

const AddTodoItem = () => {
  const { addTodo } = useStore();
  const [title, setTitle] = useState("");

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <TextField
      value={title}
      placeholder="Enter what you need to do"
      size="small"
      onKeyDown={onKeyDown}
      onChange={(event) => setTitle(event.target.value)}
    />
  );
};

export default AddTodoItem;
