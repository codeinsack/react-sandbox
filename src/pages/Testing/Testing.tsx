import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "../../store";
import { useEffect } from "react";

interface User {
  id: number;
  name: string;
  age: number;
  married: boolean;
}

const Testing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<User>();

  const { users, addUser, fetchUsers } = useStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onSubmit = (user: User) => {
    addUser(user.name, user.age, user.married);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <TextField
            {...register("name", { required: "Name is required" })}
            helperText={errors.name?.message}
            error={!!errors.name}
            label="Name"
            size="small"
            variant="outlined"
          />
          <TextField
            {...register("age", { required: "Age is required" })}
            helperText={errors.age?.message}
            error={!!errors.age}
            label="Age"
            variant="outlined"
            size="small"
          />
          <FormControlLabel
            control={
              <Controller
                name="married"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Checkbox {...field} checked={!!value} />
                )}
              />
            }
            label="Married"
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Testing;
