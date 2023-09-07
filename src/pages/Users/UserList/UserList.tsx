import React from "react";
import { User } from "../models/user";

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  const renderedUsers = users.map((user) => (
    <tr key={user.name}>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody data-testid="users">{renderedUsers}</tbody>
    </table>
  );
};

export default UserList;
