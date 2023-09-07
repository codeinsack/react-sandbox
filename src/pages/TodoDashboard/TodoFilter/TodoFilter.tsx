import React, { useState, ChangeEvent } from "react";
import { Completeness } from "../../../models/completeness";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useStore } from "../../../store";

const TodoFilter = () => {
  const { fetchTodos } = useStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completeness, setCompleteness] = useState<Completeness>(
    Completeness.All
  );

  const onSearchTermChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchTerm(value);
    const isCompleted = calculateCompleteness();
    fetchTodos({
      q: value,
      isCompleted,
    });
  };

  const onCompletenessChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as Completeness;
    setCompleteness(value);
    const isCompleted = calculateCompleteness(value);
    fetchTodos({
      q: searchTerm,
      isCompleted,
    });
  };

  const calculateCompleteness = (value?: Completeness): boolean | undefined => {
    if (value === Completeness.Completed) {
      return true;
    } else if (value === Completeness.Uncompleted) {
      return false;
    }
  };

  return (
    <>
      <TextField
        value={searchTerm}
        placeholder="Search"
        size="small"
        onChange={onSearchTermChange}
      />
      <Stack alignItems="center">
        <RadioGroup
          defaultValue={Completeness.All}
          value={completeness}
          row
          onChange={onCompletenessChange}
        >
          <FormControlLabel
            value={Completeness.All}
            control={<Radio />}
            label="All"
          />
          <FormControlLabel
            value={Completeness.Completed}
            control={<Radio />}
            label="Completed"
          />
          <FormControlLabel
            value={Completeness.Uncompleted}
            control={<Radio />}
            label="Uncompleted"
          />
        </RadioGroup>
      </Stack>
    </>
  );
};

export default TodoFilter;
