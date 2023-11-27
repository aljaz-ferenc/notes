import React, { useEffect, useState } from "react";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";
import { useNavigate } from "react-router";
import { useUserContext } from "../UserContext";
import "./Login.scss";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const [state, setState] = useState("login");
  const { user } = useUserContext();
  const navigate = useNavigate();

  //skip login if user is already authenticated
  useEffect(() => {
    if (!user.loggedIn || !user.id) return;
    navigate(`/user/${user.id}/notes`);
  }, [user.loggedIn]);

  return (
    <div className="login">
      <Toaster />
      {state === "login" ? (
        <LoginForm setState={setState} />
      ) : (
        <RegisterForm setState={setState} />
      )}
    </div>
  );
}
