import "./ChangePassForm.scss";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { logoutUser, updatePassword } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ChangePassForm({ onResponse }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChangePassword(formData) {
    setIsSubmitting(true);
    updatePassword(formData)
      .then((res) => {
        if (res.status === "success") {
          onResponse(true, "Password changed successfuly! Logging out...");
          setTimeout(() => {
            logoutUser().then((res) => {
              if (res.status === "success") {
                navigate("/login", { replace: true });
              } else {
                throw new Error(res.message);
              }
            });
          }, 2500);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        onResponse(false, err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="change-password">
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <h3>Change Password</h3>
        <div className="input-group">
          <label htmlFor="currentPassword">Password</label>
          <input
            {...register("currentPassword", {
              required: {
                value: true,
                message: "Password required.",
              },
            })}
            type="password"
            id="currentPassword"
          />
          <p className="error">{errors.currentPassword?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="newPassword">New password</label>
          <input
            {...register("newPassword", {
              required: {
                value: true,
                message: "New password is required.",
              },
              minLength: {
                value: 6,
                message: "Min 6 characters.",
              },
            })}
            type="password"
            id="newPassword"
          />
          <p className="error">{errors.newPassword?.message}</p>
        </div>
        <div className="input-group">
          <label htmlFor="PpasswordConfirm">Confirm new password</label>
          <input
            {...register("newPasswordConfirm", {
              required: {
                value: true,
                message: "Please confirm your new password.",
              },
              validate: {
                passwordsMatch: (passConf) =>
                  passConf === getValues("newPassword") ||
                  "Passwords do not match.",
              },
            })}
            type="password"
            id="PpasswordConfirm"
          />
          <p className="error">{errors.newPasswordConfirm?.message}</p>
        </div>
        <p className="change-password__note">
          You will have to log in again after changing your password.
        </p>
        <Button
          colorHover="white"
          backgroundColor="#3f84ed"
          backgroundColorHover="#1160d7"
          type="submit"
          isSubmitting={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
