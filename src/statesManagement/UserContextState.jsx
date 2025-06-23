import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextState({ children }) {
  const [users, setUsers] = useState([]);
  const value = {
    users: users,
    setUsers,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
