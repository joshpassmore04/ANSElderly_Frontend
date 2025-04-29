import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  loggedIn: boolean;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserStateProvider");
  }
  return context;
};

interface UserStateProviderProps {
  children: ReactNode;
}


export const UserStateProvider: React.FC<UserStateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    loggedIn: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
