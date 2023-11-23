import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api";
import { useNavigate } from "react-router";

export default function LoginForm({ setState }) {
    const [isFetching, setIsFetching] = useState(false)
    const [serverError, setServerError] = useState('')
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(formData){
    setIsFetching(true)
    try{
        const res = await loginUser(formData)
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
      <span>Don't have an account?</span>
      <span onClick={() => setState("register")}>Register!</span>
      <button>{isFetching ? 'Wait...':'Login'}</button>
    </form>
  );
}
