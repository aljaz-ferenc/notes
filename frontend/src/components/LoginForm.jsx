import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api";
import { useNavigate } from "react-router";
import "./LoginForm.scss";
import Button from "./Button";

export default function LoginForm({ setState }) {
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(formData) {
    console.log("submit");
    setIsFetching(true);
    try {
      const res = await loginUser(formData);
      if (res.status === "success") navigate("/");
      else throw new Error(res.message);
    } catch (err) {
      console.log(err.message);
      setServerError(err.message);
    }
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit(submitForm)}>
        <h1>Login</h1>
        <div className="input-group">
          <input
            {...register("email")}
            placeholder="Email"
            type="text"
            id="email"
          />
        </div>
        <div className="input-group">
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            id="password"
          />
        </div>
        <p className="login-form__text-bottom">
          Don't have an account?
          <span onClick={() => setState("register")}> Register!</span>
        </p>
        <Button type="submit" colorHover="#4487bd" outline="2px solid white">
          {isFetching ? "Wait..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
