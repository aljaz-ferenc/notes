import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router";
import { useUserContext } from "../UserContext";
import "./Login.scss";

export default function Login() {
  const [state, setState] = useState("login");
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) return;
    navigate("/");
  }, [user.loggedIn]);

  return (
    <div className="login">
      {state === "login" ? (
        <LoginForm setState={setState} />
      ) : (
        <RegisterForm setState={setState} />
      )}
    </div>
  );
}
