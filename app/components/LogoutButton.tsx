"use client";
import React from "react";
import { logout } from "../actions";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
    document.location.reload();
  };

  return (
    <button className="btn btn-error btn-xs m-2" onClick={handleLogout}>Logout</button>
  );
}
