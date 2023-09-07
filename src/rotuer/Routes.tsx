import { createBrowserRouter, RouteObject } from "react-router-dom";

import TodoDashboard from "../pages/TodoDashboard/TodoDashboard";
import UseTransition from "../pages/UseTransision/UseTransition";
import UseMemo from "../pages/UseMemo/UseMemo";
import App from "../App";
import TodoForm from "../pages/TodoForm/TodoForm";
import Users from "../pages/Users/Users";
import Testing from "../pages/Testing/Testing";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <TodoDashboard /> },
      { path: "use-transition", element: <UseTransition /> },
      { path: "use-memo", element: <UseMemo /> },
      { path: "details/:todoId", element: <TodoForm /> },
      { path: "users", element: <Users /> },
      { path: "testing", element: <Testing /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
