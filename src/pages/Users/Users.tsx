import React, { useState } from "react";
import UserForm from "./UserForm/UserForm";
import { User } from "./models/user";
import UserList from "./UserList/UserList";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const onUserAdd = (user: User) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </div>
  );
};

export default Users;
