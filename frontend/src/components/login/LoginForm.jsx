import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api";
import { useNavigate } from "react-router";
import "./LoginForm.scss";
import Button from "../ui/Button";
import toast from "react-hot-toast";

export default function LoginForm({ setState }) {
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(formData) {
    setIsFetching(true);
    try {
      const res = await loginUser(formData);
      if (res.status === "success") {
        navigate(`/user/${res.data._id}/notes`);
      } else throw new Error(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit(submitForm)}>
        <h1>Login</h1>
        <div className="input-group">
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required.",
              },
              validate: {
                isEmail: (email) =>
                  email.includes("@") || 'Email must include "@"',
              },
            })}
            placeholder="Email"
            type="text"
            id="email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="input-group">
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is required.",
              },
              minLength: {
                value: 6,
                message: "Min 6 characters.",
              },
            })}
            placeholder="Password"
            type="password"
            id="password"
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <p className="login-form__text-bottom">
          Don't have an account?
          <span onClick={() => setState("register")}> Register!</span>
        </p>
        <Button isSubmitting={isFetching} type="submit" colorHover="white">
          Login
        </Button>
      </form>
    </div>
  );
}
