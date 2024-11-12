import React, { ReactNode, useContext } from "react";
import { createContext, useReducer } from "react";
import { UserContextValue, reducerUpdate, intialValue } from "./types";

interface UserContextProvider_Prob {
  children: ReactNode;
}

// User Context
const UserContext = createContext<UserContextValue | undefined>(undefined);

// User Context provider function
export const UserContextProvider: React.FC<UserContextProvider_Prob> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducerUpdate, intialValue);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const UserContextData = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
};

export default UserContextData;
