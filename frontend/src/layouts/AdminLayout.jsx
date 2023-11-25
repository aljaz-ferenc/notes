import React from "react";
import { Outlet, useLoaderData } from "react-router";
import { getAllUsers } from "../api";
import "./AdminLayout.scss";
import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminLayout() {
  const users = useLoaderData();

  return (
    <div>
      <div className="admin-layout">
        <div className="admin-layout__users">
          {users.map((user) => (
            <NavLink
              to={`users/${user._id}/notes`}
              key={user._id}
              className="admin-layout__users--user"
            >
              {user.role === "user" ? (
                <FaRegCircleUser size={20} color="gray" />
              ) : (
                <MdAdminPanelSettings size={20} color="gray" />
              )}
              {user.email}
            </NavLink>
          ))}
        </div>
        <Outlet/>
      </div>
    </div>
  );
}

export async function loader() {
  console.log("admin loader");
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
