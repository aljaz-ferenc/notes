import { Outlet, redirect, useLoaderData } from "react-router";
import { authenticateUser } from "../api";
import "./RootLayout.scss";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";
import { useUserContext } from "../UserContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  const loaderData = useLoaderData();
  const { updateUser } = useUserContext();

  useEffect(() => {
    updateUser(loaderData);
  }, []);

  return (
    <div className="root-layout">
      <Toaster />
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export async function loader() {
  const res = await authenticateUser();

  if (res.status === "success") {
    return res.data;
  } else {
    return redirect("/login");
  }
}
