import "./ChangePassForm.scss";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { logoutUser, updatePassword } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ChangePassForm({ onResponse }) {
  const { register, handleSubmit } = useForm();
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
            {...register("currentPassword")}
            type="password"
            id="currentPassword"
          />
        </div>
        <div className="input-group">
          <label htmlFor="newPassword">New password</label>
          <input
            {...register("newPassword")}
            type="password"
            id="newPassword"
          />
        </div>
        <div className="input-group">
          <label htmlFor="PpasswordConfirm">Confirm new password</label>
          <input
            {...register("newPasswordConfirm")}
            type="password"
            id="PpasswordConfirm"
          />
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
