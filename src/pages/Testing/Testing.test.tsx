import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Testing from "./Testing";
import { createServer } from "../../test/server";
import { useStore } from "../../store";

// Button = btn
// TextField = tf

const createUser = (name: string, age: string) => {
  const $nameTf = screen.getByRole("textbox", {
    name: /name/i,
  });
  const $ageTf = screen.getByRole("textbox", {
    name: /age/i,
  });
  const $marriedTf = screen.getByRole("checkbox", {
    name: /married/i,
  });
  const $submitButton = screen.getByRole("button");

  userEvent.type($nameTf, name);
  userEvent.type($ageTf, age);
  userEvent.click($marriedTf);
  userEvent.click($submitButton);

  return { $nameTf, $ageTf, $marriedTf };
};

const renderComponent = async () => {
  await waitFor(() => {
    render(<Testing />);
  });
};

describe("with initial data from the server", () => {
  createServer([
    {
      method: "get",
      path: "/users",
      res: () => {
        return [
          {
            id: 0.7735145388516254,
            name: "Jane",
            age: 19,
            married: false,
          },
          {
            id: 0.04481484609969111,
            name: "Mary",
            age: 27,
            married: true,
          },
        ];
      },
    },
  ]);

  test("should display 2 users after component is rendered", async () => {
    await renderComponent();

    const $listItems = await screen.findAllByRole("listitem");

    expect($listItems).toHaveLength(2);
  });
});

describe("without initial data from the server", () => {
  createServer([
    {
      method: "get",
      path: "/users",
      res: () => {
        return [];
      },
    },
  ]);

  beforeEach(() => {
    useStore.getState().users = [];
  });

  test("should display a user when prefilled form is submitted", async () => {
    await renderComponent();

    createUser("Jane", "27");

    const $listItem = await screen.findByRole("listitem");

    expect($listItem).toBeInTheDocument();
    expect($listItem).toHaveTextContent(/jane/i);
  });

  test("after form is submitted user fields should be cleared", async () => {
    await renderComponent();

    const { $marriedTf, $ageTf, $nameTf } = createUser("Jane", "27");

    await screen.findByRole("listitem");

    expect($nameTf).toHaveTextContent("");
    expect($ageTf).toHaveTextContent("");
    expect($marriedTf).not.toBeChecked();
  });

  test("after form is submitted 3 times 3 users should be displayed", async () => {
    await renderComponent();

    await waitFor(() => {
      createUser("Jane", "27");
    });
    await waitFor(() => {
      createUser("Alex", "40");
    });
    await waitFor(() => {
      createUser("Mary", "17");
    });

    const $listItems = await screen.findAllByRole("listitem");

    expect($listItems).toHaveLength(3);
  });

  test("should show errors when required fields are not filled", async () => {
    await renderComponent();

    const $submitButton = screen.getByRole("button");

    userEvent.click($submitButton);

    const $ageValidationError = await screen.findByText(/age is required/i);
    const $nameValidationError = await screen.findByText(/name is required/i);

    expect($ageValidationError).toBeInTheDocument();
    expect($nameValidationError).toBeInTheDocument();
  });
});
