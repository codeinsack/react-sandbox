import { StateCreator } from "zustand";
import axios from "axios";

interface User {
  id: number;
  name: string;
  age: number;
  married: boolean;
}

export interface UserSlice {
  users: User[];
  addUser: (name: string, age: number, married: boolean) => void;
  fetchUsers: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  users: [],
  addUser: (name: string, age: number, married: boolean) => {
    const user: User = {
      id: Math.random(),
      name,
      age,
      married,
    };
    set(({ users }) => ({
      users: users.concat(user),
    }));
  },
  fetchUsers: async () => {
    const { data } = await axios.get("http://localhost:3001/users");
    set(() => ({
      users: data,
    }));
  },
});
