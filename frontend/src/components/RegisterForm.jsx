import { useForm } from "react-hook-form";
import { registerUser } from "../api";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./RegisterForm.scss";
import Button from "./Button";

export default function RegisterForm({ setState }) {
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(formData) {
    setIsFetching(true);
    try {
      const res = await registerUser(formData);
      if (res.status === "success") navigate("/");
      else throw new Error(res.message);
    } catch (err) {
      console.log(err.message);
      setServerError(err.message);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit(submitForm)}>
        <h1>Register</h1>
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
        <div className="input-group">
          <input
            {...register("passwordConfirm")}
            type="password"
            id="password-confirm"
            placeholder="Confirm Password"
          />
        </div>
        <p className="register-form__text-bottom">
          Already have an account?
          <span onClick={() => setState("login")}> Login!</span>
        </p>
        <Button colorHover="#4487bd" outline="2px solid white" type="submit">
          {isFetching ? "Wait..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
