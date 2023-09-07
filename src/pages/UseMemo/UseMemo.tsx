import React, { useMemo, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";

import { fibonacci } from "../../helpers/fibonacci";

const UseMemo = () => {
  const [value, setValue] = useState("");
  const [num, setNum] = useState(38);
  const result = useMemo(() => fibonacci(num), [num]);

  return (
    <Stack spacing={2}>
      <TextField
        value={num}
        type="number"
        size="small"
        onChange={(e) => setNum(Number.parseInt(e.target.value))}
      />
      <TextField
        value={value}
        size="small"
        placeholder="Type something to change local state"
        onChange={(e) => setValue(e.target.value)}
      />
      <Typography variant="subtitle1">{`The result is: ${result}`}</Typography>
    </Stack>
  );
};

export default UseMemo;
