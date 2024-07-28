"use client";
import React from "react";
import { register } from "../actions";

export default function Register() {
  const [input, setInput] = React.useState({} as any);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await register(input);
    if (result.success) document.location = "/";
    setMessage(result.message);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput({ ...input, [e.target.name]: e.target.value });

  return (
    <form className="bg-base-200 rounded-xl shadow-xl text-center p-2 m-1" onSubmit={handleSubmit}>
      <h1 className="text-4xl p-8">Register</h1>
      {message ? <div className="alert">{message}</div> : null}
      <div className="grid gap-1">
        <input className="input w-full sm:col-span-2" name="email" value={input.email} onChange={handleChange} placeholder="Email" />
        <input className="input w-full" name="firstname" value={input.firstname} onChange={handleChange} placeholder="First Name" />
        <input className="input w-full" name="lastname" value={input.lastname} onChange={handleChange} placeholder="Last Name" />
        <input className="input w-full" name="password" type="password" value={input.password} onChange={handleChange} placeholder="Password" />
        <input className="input w-full" name="password2" type="password" value={input.password2} onChange={handleChange} placeholder="Confirm Password" />
      </div>
      <button className="btn btn-success m-1">Register</button>
    </form>
  );
}
