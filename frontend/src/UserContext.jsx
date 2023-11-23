import { createContext, useContext, useEffect, useReducer } from "react";
import { authenticateUser } from "./api";

const UserContext = createContext();

const initialState = {
  id: null,
  email: null,
  notes: [],
  loggedIn: false
};

function reducer(state, action) {
  switch (action.type) {
    case "user/update":
      return { ...state, ...action.payload };
    case 'status/set':
      return {...state, loggedIn: action.payload}
  }
}

export default function UserContextProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initialState);

  function updateUser(userData) {
    dispatch({ type: "user/update", payload: userData });
  }

  function setLoggedInStatus(status){
    dispatch({type: 'status/set', payload: status})
  }

  useEffect(() => {
    if(user.loggedIn) return
    async function authUser(){
      const res = await authenticateUser()
      if(res.status === 'success'){
        console.log('authenticated')
        setLoggedInStatus(true)
      }else{
        console.log('not authenticated')
        setLoggedInStatus(false)
      }
    }
    authUser()
  }, [user.loggedIn])

  return (
    <UserContext.Provider value={{ user, updateUser, setLoggedInStatus }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(){
    return useContext(UserContext)
}
