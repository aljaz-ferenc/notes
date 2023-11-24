import Button from "../ui/Button";
import "./DeleteAccForm.scss";
import { useForm } from "react-hook-form";

export default function DeleteAccForm() {
  const { register, handleSubmit } = useForm();

  function handleDeleteAccount(formData) {
    console.log(formData);
  }

  return (
    <div className="delete-account">
      <form onSubmit={handleSubmit(handleDeleteAccount)}>
        <h3>Delete Account</h3>
        <div className="input-group">
          <label htmlFor="text">Email</label>
          <input {...register("email")} type="email" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input {...register("password")} type="password" id="password" />
        </div>
        <p className="change-password__note">All your info will be deleted. This action cannot be undone.</p>
      <Button
        colorHover="white"
        backgroundColorHover="#e40000"
        backgroundColor="red"
        type="submit"
      >
        Delete
      </Button>
      </form>
    </div>
  );
}
