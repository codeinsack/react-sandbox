import { render, screen } from "@testing-library/react";
import AccessibleName from "./AccessibleName";

test("can select by accessible name", () => {
  render(<AccessibleName />);

  const submitButton = screen.getByRole("button", {
    name: /submit/i,
  });

  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

test("shows an email and search input", () => {
  render(<AccessibleName />);

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  const searchInput = screen.getByRole("textbox", {
    name: /search/i,
  });

  expect(emailInput).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});

test("find elements based on label", () => {
  render(<AccessibleName />);

  const signInButton = screen.getByRole("button", {
    name: /sign in/i,
  });

  const signOutButton = screen.getByRole("button", {
    name: /sign out/i,
  });

  expect(signInButton).toBeInTheDocument();
  expect(signOutButton).toBeInTheDocument();
});
