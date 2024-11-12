export interface User {
  id: string;
  name: string;
  email: string;
  isAuth: boolean;
  isProjectRegistered: boolean;
}

export type UserAction =
  | { type: "SET_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: Partial<User> };

export interface UserContextValue {
  state: User;
  dispatch: React.Dispatch<UserAction>;
}

// initial values
export const intialValue: User = {
  id: "",
  name: "",
  email: "",
  isAuth: false,
  isProjectRegistered: false,
};

// UPDATE FUNCTION
export const reducerUpdate = (state: User, action: UserAction) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };

    case "UPDATE_USER":
      return { ...state, ...action.payload };
  }

  return state;
};
