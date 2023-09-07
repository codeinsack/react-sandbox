import React, { ChangeEvent, useState, useTransition } from "react";
import {
  LinearProgress,
  List,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";

const UseTransition = () => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput(value);
    if (value) {
      startTransition(() => {
        const l: string[] = [];
        for (let i = 0; i < 20000; i++) {
          l.push(value);
        }
        setList(l);
      });
    } else {
      setList([]);
    }
  };

  return (
    <Stack>
      <TextField
        value={input}
        variant="outlined"
        size="small"
        placeholder="Please type something to render a list"
        onChange={handleChange}
      />
      {isPending ? (
        <LinearProgress sx={{ mt: "1rem" }} />
      ) : (
        <List>
          {list.map((i, index) => (
            <ListItem key={index}>{i}</ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default UseTransition;
