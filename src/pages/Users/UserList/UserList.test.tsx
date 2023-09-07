import { render, screen, within } from "@testing-library/react";

import UserList from "./UserList";
import { User } from "../models/user";

function renderComponent() {
  const users: User[] = [
    {
      name: "Jane",
      email: "jane@mail.io",
    },
    {
      name: "Sam",
      email: "sam@mail.io",
    },
  ];
  render(<UserList users={users} />);

  return {
    users,
  };
}

test("render one row per user", () => {
  // const { container } = render(<UserList users={users} />);
  // const rows = container.querySelectorAll("tbody tr");
  // screen.logTestingPlaygroundURL();
  // screen.debug();
  renderComponent();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  const { users } = renderComponent();

  users.forEach((user) => {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
