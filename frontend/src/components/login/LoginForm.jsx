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
    setValue,
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

  function setTestUserValues(user) {
    switch (user) {
      case "user1":
        setValue("email", "user1@email.com");
        setValue("password", "user123");
        break;
      case "user2":
        setValue("email", "user2@email.com");
        setValue("password", "user123");
        break;
      case "admin":
        setValue("email", "admin@email.com");
        setValue("password", "admin123");
        break;
    }
  }

  return (
    <div className="login-form-container">
      <div className="test-users">
        <div>
          <Button
            backgroundColorHover="orange"
            backgroundColor="orange"
            onClick={() => setTestUserValues("user1")}
          >
            User 1
          </Button>
          <Button
            backgroundColorHover="orange"
            backgroundColor="orange"
            onClick={() => setTestUserValues("user2")}
          >
            User 2
          </Button>
          <Button
            backgroundColorHover="orange"
            backgroundColor="orange"
            onClick={() => setTestUserValues("admin")}
          >
            Admin
          </Button>
        </div>
      </div>
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
