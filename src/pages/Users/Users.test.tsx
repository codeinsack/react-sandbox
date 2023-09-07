import { render, screen } from "@testing-library/react";

import Users from "./Users";
import { fillAndSubmitForm } from "./UserForm/UserForm.test";

test("can receive a new user and show it on a list", () => {
  render(<Users />);

  fillAndSubmitForm();

  const name = screen.getByRole("cell", { name: "Jane" });
  const email = screen.getByRole("cell", { name: "jane@mail.io" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
