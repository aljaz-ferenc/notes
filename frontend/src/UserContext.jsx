import { createContext, useContext, useEffect, useReducer } from "react";
import { authenticateUser } from "./api";

const UserContext = createContext();

const initialState = {
  id: null,
  email: null,
  notes: [],
  loggedIn: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user/update":
      return { ...state, ...action.payload };
    case "status/set":
      return { ...state, loggedIn: action.payload };
    case "notes/update":
      return { ...state, notes: action.payload };
    case "notes/updateOne":
      const { noteId, noteData } = action.payload;
      const index = state.notes.findIndex((note) => note._id === noteId);
      const newNotes = state.notes;
      newNotes[index] = noteData;
      return {
        ...state,
        notes: [...newNotes],
      };
  }
}

export default function UserContextProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initialState);

  function updateUser(userData) {
    dispatch({ type: "user/update", payload: userData });
  }

  function setLoggedInStatus(status) {
    dispatch({ type: "status/set", payload: status });
  }

  function updateNotes(notes) {
    dispatch({ type: "notes/update", payload: notes });
  }

  function updateOne(noteId, noteData) {
    dispatch({ type: "notes/updateOne", payload: { noteId, noteData } });
  }

  useEffect(() => {
    if (user.loggedIn) return;
    async function authUser() {
      const res = await authenticateUser();
      if (res.status === "success") {
        setLoggedInStatus(true);
        updateUser(res.data)
      } else {
        setLoggedInStatus(false);
      }
    }
    authUser();
  }, [user.loggedIn]);

  return (
    <UserContext.Provider
      value={{ user, updateUser, setLoggedInStatus, updateNotes, updateOne }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
