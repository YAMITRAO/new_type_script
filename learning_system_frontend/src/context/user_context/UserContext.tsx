import React, { ReactNode } from "react";
import { createContext, useReducer } from "react";
import { UserContextValue, reducerUpdate, intialValue } from "./types";

interface UserContextProvider_Prob {
  children: ReactNode;
}

// User Context
const UserContext = createContext<UserContextValue>({
  state: intialValue,
  dispatch: () => {},
});

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

// const ctx = useContext(UserContext);

// const UserContextData = () => {
//   console.log("User context data called...");
//   if (!ctx) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return ctx;
// };

export default UserContext;
