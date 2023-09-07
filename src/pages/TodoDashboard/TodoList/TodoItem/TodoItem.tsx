import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";
import { Todo } from "../../../../models/todo";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  CancelOutlined,
  SaveOutlined,
  DetailsOutlined,
} from "@mui/icons-material";
import { useStore } from "../../../../store";
import { useNavigate } from "react-router-dom";

interface Props {
  item: Todo;
}

const TodoItem = ({ item }: Props) => {
  const updateTodo = useStore((state) => state.updateTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const inputTitleRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState(item.title);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit) {
      inputTitleRef.current?.focus();
    }
  }, [isEdit]);

  const onCompletenessChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    updateTodo(
      {
        ...item,
        isCompleted: checked,
      },
      "isCompleted"
    );
  };

  const onSaveClick = () => {
    updateTodo(
      {
        ...item,
        title,
      },
      "title"
    );
    setIsEdit(false);
  };

  const onEditClick = () => {
    setIsEdit(true);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSaveClick();
    }
  };

  const $item = isEdit ? (
    <TextField
      ref={inputTitleRef}
      value={title}
      variant="outlined"
      size="small"
      onKeyDown={onKeyDown}
      onChange={(event) => setTitle(event.target.value)}
    />
  ) : (
    <FormControlLabel
      control={
        <Checkbox checked={item.isCompleted} onChange={onCompletenessChange} />
      }
      label={item.title}
    />
  );

  return (
    <ListItem sx={{ justifyContent: "space-between" }}>
      {$item}
      {isEdit ? (
        <Stack direction="row">
          <IconButton color="error" onClick={() => setIsEdit(false)}>
            <CancelOutlined />
          </IconButton>
          <IconButton color="success" onClick={onSaveClick}>
            <SaveOutlined />
          </IconButton>
        </Stack>
      ) : (
        <Stack direction="row">
          <IconButton
            color="secondary"
            onClick={() => navigate(`/details/${item.id}`)}
          >
            <DetailsOutlined />
          </IconButton>
          <IconButton color="primary" onClick={onEditClick}>
            <EditOutlined />
          </IconButton>
          <IconButton color="error" onClick={() => deleteTodo(item.id)}>
            <DeleteOutlined />
          </IconButton>
        </Stack>
      )}
    </ListItem>
  );
};

export default memo(TodoItem);
