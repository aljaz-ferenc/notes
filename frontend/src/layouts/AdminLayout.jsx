import React from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router";
import { getAllUsers } from "../api";
import "./AdminLayout.scss";
import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { useUserContext } from "../UserContext";

export default function AdminLayout() {
  const users = useLoaderData();
  const navigate = useNavigate();
  const { user: thisUser } = useUserContext();

  function handleSelectUser(e) {
    const userId = e.target.value;
    if (!userId) return;

    navigate(`./users/${userId}/notes`);
  }

  return (
    <div>
      <div className="admin-layout">
        <div className="admin-layout__mobile-users">
          <p>User:</p>
          <select onChange={handleSelectUser} name="" id="">
            <option value={null}>Select user...</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-layout__users">
          {users.map((user) => (
            <NavLink
              to={`users/${user._id}/notes`}
              key={user._id}
              className="admin-layout__users--user"
              style={{ display: user._id === thisUser.id ? "none" : "flex" }}
            >
              {user.role === "user" ? (
                <FaRegCircleUser size={20} color="gray" />
              ) : (
                <MdAdminPanelSettings size={20} color="gray" />
              )}
              <span>{user.email}</span>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export async function loader() {
  try {
    const response = await getAllUsers();
    if (response.status === "success") {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    throw new Error(response.message);
  }
}
