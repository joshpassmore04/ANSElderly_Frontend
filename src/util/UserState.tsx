import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string | null;
  name: string;
  email: string;
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
    name: '',
    email: '',
    loggedIn: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
