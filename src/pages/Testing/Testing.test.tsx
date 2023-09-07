import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Testing from "./Testing";

function createUser(name: string, age: string) {
  const $name = screen.getByRole("textbox", {
    name: /name/i,
  });
  const $age = screen.getByRole("textbox", {
    name: /age/i,
  });
  const $married = screen.getByRole("checkbox", {
    name: /married/i,
  });

  userEvent.click($name);
  act(() => {
    userEvent.keyboard(name);
  });

  userEvent.click($age);
  act(() => {
    userEvent.keyboard(age);
  });

  act(() => {
    userEvent.click($married);
  });

  const $submitButton = screen.getByRole("button");

  act(() => {
    userEvent.click($submitButton);
  });
}

test("should display text Hello World", () => {
  // render component
  render(<Testing />);

  // find element using query
  const $link = screen.getByRole("link");

  // assertion
  expect($link).toHaveTextContent(/hello world/i);
});

test("should display inputs: name, age, married", () => {
  render(<Testing />);

  const $name = screen.getByRole("textbox", {
    name: /name/i,
  });
  const $age = screen.getByRole("textbox", {
    name: /age/i,
  });
  const $married = screen.getByRole("checkbox", {
    name: /married/i,
  });

  expect($name).toBeInTheDocument();
  expect($age).toBeInTheDocument();
  expect($married).toBeInTheDocument();
});

test("should display a user when prefilled form is submitted", () => {
  render(<Testing />);

  createUser("Jane", "27");

  const $listItem = screen.getByRole("listitem");

  expect($listItem).toBeInTheDocument();
  expect($listItem).toHaveTextContent(/jane/i);
});

test("should display 3 users when prefilled form is submitted 3 times", () => {
  render(<Testing />);

  createUser("Jane", "27");
  createUser("Alex", "30");
  createUser("Martin", "16");

  const $listItems = screen.getAllByRole("listitem");

  expect($listItems).toHaveLength(3);
});

test("after form is submitted user fields should be cleared", () => {
  render(<Testing />);

  const $name = screen.getByRole("textbox", {
    name: /name/i,
  });
  const $age = screen.getByRole("textbox", {
    name: /age/i,
  });
  const $married = screen.getByRole("checkbox", {
    name: /married/i,
  });

  createUser("Jane", "27");

  expect($name).toHaveTextContent("");
  expect($age).toHaveTextContent("");
  expect($married).not.toBeChecked();
});
