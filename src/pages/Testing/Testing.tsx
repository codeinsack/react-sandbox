import React, { ChangeEvent, FormEvent, useState } from "react";

interface User {
  id: number;
  name: string;
  age: number;
  married: boolean;
}

const initialUser: User = {
  id: 0,
  name: "",
  age: 0,
  married: false,
};

const Testing = () => {
  const [user, setUser] = useState<User>(initialUser);
  const [users, setUsers] = useState<User[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsers([...users, { ...user, id: Math.random() }]);
    setUser(initialUser);
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUser({
      ...user,
      name: value,
    });
  };

  const onAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUser({
      ...user,
      age: Number.parseInt(value),
    });
  };

  const onMarriedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setUser({
      ...user,
      married: checked,
    });
  };

  return (
    <div>
      <a href="#">Hello World</a>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={user.name}
            id="name"
            type="text"
            onChange={onNameChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input value={user.age} id="age" type="text" onChange={onAgeChange} />
        </div>
        <div>
          <label htmlFor="married">Married</label>
          <input
            checked={user.married}
            id="married"
            type="checkbox"
            onChange={onMarriedChange}
          />
        </div>
        <button>Submit</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Testing;
