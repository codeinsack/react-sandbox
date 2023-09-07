import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import UserForm from "./UserForm";

export function fillAndSubmitForm() {
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  act(() => {
    user.keyboard("Jane");
  });

  user.click(emailInput);
  act(() => {
    user.keyboard("jane@mail.io");
  });

  act(() => {
    user.click(button);
  });

  return { nameInput, emailInput };
}

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm onUserAdd={() => {}} />);

  // manipulate the component or file an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);

  fillAndSubmitForm();

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "Jane", email: "jane@mail.io" });
});

test("empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const { nameInput, emailInput } = fillAndSubmitForm();

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
