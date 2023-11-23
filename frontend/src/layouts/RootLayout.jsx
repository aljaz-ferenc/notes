import { Outlet, redirect, useLoaderData } from "react-router";
import { authenticateUser } from "../api";
import "./RootLayout.scss";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";
import { useUserContext } from "../UserContext";

export default function RootLayout() {
  const loaderData = useLoaderData();
  const { user, updateUser } = useUserContext();

  useEffect(() => {
    updateUser(loaderData);
  }, []);

  return (
    <div className="root-layout">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export async function loader() {
  const res = await authenticateUser();

  if (res.status === "success") {
    console.log('root layout success')
    return res.data;
  } else {
    console.log(res);
    return redirect("/login");
  }
}
