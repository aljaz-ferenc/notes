import "./ChangePassForm.scss";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";

export default function ChangePassForm() {
  const { register, handleSubmit } = useForm();
  
  function handleChangePassword(formData) {
    console.log(formData);
  }

  return (
    <div className="change-password">
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <h3>Change Password</h3>
        <div className="input-group">
          <label htmlFor="Ppassword">Password</label>
          <input {...register("password")} type="password" id="Ppassword" />
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
            {...register("passwordConfirm")}
            type="password"
            id="PpasswordConfirm"
          />
        </div>
        <Button
          colorHover="white"
          backgroundColor="#3f84ed"
          backgroundColorHover="#1160d7"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
