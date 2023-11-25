import { Outlet, useLoaderData, useNavigate } from "react-router";
import { getAllUsers, getUser } from "../api";
import "./Admin.scss";
import { useState } from "react";

export default function Admin() {
  const [user, setUser] = useState(null)
  const users = useLoaderData();
  const navigate = useNavigate()
  
  function handleClickUser(userId){
    navigate(`./users/${userId}`)
  }

  return (
    // <div className="admin">
    //   <h2>Users</h2>
    //   <div className="admin__users">
    //     {users.map((user) => (
    //        <p key={user._id} onClick={() => handleClickUser(user._id)} className="admin__users--user">{user.email}</p>
    //     ))}
    //   </div>
    //   <Outlet context={user}/>
    // </div>
    <></>
  );
}

