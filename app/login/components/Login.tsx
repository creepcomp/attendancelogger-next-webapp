"use client";
import React from "react";
import { login } from "../actions";

export default function Login() {
  const [input, setInput] = React.useState({ email: "", password: "" });
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(input);
    if (result.success) document.location = "/";
    setMessage(result.message);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput({ ...input, [e.target.name]: e.target.value });

  return (
    <form className="bg-base-200 rounded-xl shadow-xl w-fit text-center p-2" onSubmit={handleSubmit}>
      <h1 className="text-4xl p-8">Login</h1>
      {message ? <div className="alert">{message}</div> : null}
      <input className="block input m-1" name="email" value={input.email} onChange={handleChange} placeholder="Email" />
      <input className="block input m-1" name="password" type="password" value={input.password} onChange={handleChange} placeholder="Password" />
      <button className="btn btn-success m-1">Login</button>
    </form>
  );
}
