import React from "react";
import SlowComponent from "./SlowComponent";
import Modal from "./Modal";
import { Button } from "@mui/material";

const Composition = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} handleClose={handleClose} />
      <Button onClick={handleClickOpen}>Open Modal</Button>
      <SlowComponent />
    </div>
  );
};

export default Composition;
