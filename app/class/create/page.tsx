"use client";
import React from "react";
import { createClass } from "./actions";

export default function CreateClass() {
  const [input, setInput] = React.useState({} as any);
  const [error, setError] = React.useState({} as any);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createClass(input);
    if (result.success) {
      document.location = "/";
    } else setError(result);
  };

  return (
    <form className="bg-base-200 rounded-xl shadow-xl text-center p-2 w-fit" onSubmit={handleSubmit}>
      <h1 className="text-4xl p-8">Create class</h1>
      {error.message ? <div className="alert">{error.message}</div> : null}
      <div className="grid gap-1">
        <input className="input col-span-2" name="name" value={input.name} onChange={handleChange} placeholder="Name" />
        <input className="input" type="date" name="startAt" value={input.startAt} onChange={handleChange} placeholder="Start At" />
        <input className="input" type="date" name="endAt" value={input.endAt} onChange={handleChange} placeholder="End At" />
      </div>
      <button className="btn btn-primary m-1">Create</button>
    </form>
  );
}
