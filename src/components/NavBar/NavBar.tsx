import React from "react";
import { Tab, Tabs } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const validPaths = [
  "/",
  "/use-transition",
  "/use-memo",
  "/users",
  "/testing",
  "example-1",
];

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <Tabs value={validPaths.includes(pathname) ? pathname : false}>
      <Tab value="/" label="Todo List" component={NavLink} to="/" />
      <Tab
        value="/use-transition"
        label="Use Transition"
        component={NavLink}
        to="/use-transition"
      />
      <Tab
        value="/use-memo"
        label="Use Memo"
        component={NavLink}
        to="/use-memo"
      />
      <Tab value="/users" label="Users" component={NavLink} to="/users" />
      <Tab value="/testing" label="Testing" component={NavLink} to="/testing" />
    </Tabs>
  );
};

export default NavBar;
