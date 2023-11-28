import { useForm } from "react-hook-form";
import { registerUser } from "../../api";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./RegisterForm.scss";
import Button from "../ui/Button";
import toast from "react-hot-toast";

export default function RegisterForm({ setState }) {
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(formData) {
    setIsFetching(true);
    try {
      const res = await registerUser(formData);
      if (res.status === "success") navigate(`/user/${user.id}/notes`);
      else throw new Error(res.message);
    } catch (err) {
      if (err.message.includes("Email invalid")) err.message = "Email invalid";
      toast.error(err.message);
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
        <div className="input-group">
          <input
            {...register("passwordConfirm", {
              required: {
                value: true,
                message: "Please confirm your new password.",
              },
              validate: {
                passwordsMatch: (passConf) =>
                  passConf === getValues("password") ||
                  "Passwords do not match.",
              },
            })}
            type="password"
            id="password-confirm"
            placeholder="Confirm Password"
          />
          <p className="error">{errors.passwordConfirm?.message}</p>
        </div>
        <p className="register-form__text-bottom">
          Already have an account?
          <span onClick={() => setState("login")}> Login!</span>
        </p>
        <Button isSubmitting={isFetching} colorHover="white" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
