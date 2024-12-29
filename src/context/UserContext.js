import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    global.loggedInUser = userData;
  };

  const logout = () => {
    setUser(null);
    global.loggedInUser = null;
  };

  const updateUser = (userData) => {
    setUser(userData);
    global.loggedInUser = userData;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
} 