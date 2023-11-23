import { useForm } from "react-hook-form";
import { registerUser } from "../api";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function RegisterForm({ setState }) {
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(formData){
    setIsFetching(true)
    try{
        const res = await registerUser(formData)
        if(res.status === 'success') navigate('/')
        else throw new Error(res.message)
    }catch(err){
        console.log(err.message)
        setServerError(err.message)
    }finally{
        setIsFetching(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="text" id="email" />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" id="password" />
      </div>
      <div className="input-group">
        <label htmlFor="password-confirm">Confirm password</label>
        <input
          {...register("passwordConfirm")}
          type="password"
          id="password-confirm"
        />
      </div>
      <span>Already have an account?</span>
      <span onClick={() => setState("login")}>Login!</span>
      <button>{isFetching ? 'Wait...':'Register'}</button>
    </form>
  );
}
