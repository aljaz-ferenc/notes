import { createContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  id: null,
  email: null,
  notes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "user/update":
      const { id: _id, email, notes } = action.payload;
      return { ...state, id, email, notes };
  }
}

export default function UserContextProvider({ children }) {
  const [dispatch, user] = useReducer(reducer, initialState);

  function updateUser(userData) {
    dispatch({ type: "user/update", payload: userData });
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
