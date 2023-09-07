import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useStore } from "../../store";
import { Todo } from "../../models/todo";

const TodoForm = () => {
  const { fetchTodo, todo, todos, updateWholeTodo } = useStore();
  let { todoId } = useParams();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>();

  useEffect(() => {
    if (todo) {
      reset(todo);
    }
  }, [todo, reset]);

  useEffect(() => {
    if (todoId) {
      const targetTodo = todos.find((x) => x.id === Number.parseFloat(todoId!));
      if (targetTodo) {
        reset(targetTodo);
      } else {
        fetchTodo(Number.parseFloat(todoId));
      }
    }
  }, [todoId, fetchTodo, todos, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateWholeTodo(data);
        navigate("/");
      })}
    >
      <Stack spacing={2}>
        <TextField
          size="small"
          placeholder="Title"
          helperText={errors.title?.message}
          error={!!errors.title}
          {...register("title", { required: "Title is required" })}
        />
        <TextField
          placeholder="Description"
          {...register("description", {
            required: "Title is required",
            minLength: {
              value: 4,
              message: "Minimum length is 4",
            },
          })}
          helperText={errors.description?.message}
          error={!!errors.description}
          size="small"
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default TodoForm;
