import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  id: null,
  email: null,
  notes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "user/update":
      return { ...state, ...action.payload };
  }
}

export default function UserContextProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initialState);

  function updateUser(userData) {
    dispatch({ type: "user/update", payload: userData });
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(){
    return useContext(UserContext)
}
