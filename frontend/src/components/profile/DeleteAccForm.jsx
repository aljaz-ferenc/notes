import { useState } from "react";
import Button from "../ui/Button";
import "./DeleteAccForm.scss";
import { useForm } from "react-hook-form";
import { deleteAccount } from "../../api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useUserContext } from "../../UserContext";

export default function DeleteAccForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmittint] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  function handleDeleteAccount(formData) {
    deleteAccount({ userId: user.id, ...formData })
      .then((res) => {
        if (res.status === "success") {
          navigate("/login", { replace: true });
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <div className="delete-account">
      <form noValidate onSubmit={handleSubmit(handleDeleteAccount)}>
        <h3>Delete Account</h3>
        <div className="input-group">
          <label htmlFor="text">Email</label>
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
            type="email"
            id="email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
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
            type="password"
            id="password"
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <p className="change-password__note">
          All your info will be deleted. This action cannot be undone.
        </p>
        <Button
          colorHover="white"
          backgroundColorHover="#e40000"
          backgroundColor="red"
          type="submit"
          loaderColor="red"
          isSubmitting={isSubmitting}
        >
          Delete
        </Button>
      </form>
    </div>
  );
}
