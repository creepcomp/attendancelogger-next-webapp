import React from "react";
import ClassList from "./ClassList";
import { getUser } from "../server/auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function Template({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) return redirect("/login");

  return (
    <>
      <div className="drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="drawer" className="btn btn-primary drawer-button absolute top-0">
            <i className="fa fa-bars" />
          </label>
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <div className="menu bg-base-200 w-80 min-h-full">
            <div className="p-8">
              <div>{user.firstname + " " + user.lastname}</div>
              <LogoutButton />
            </div>
            <ClassList />
          </div>
        </div>
      </div>
    </>
  );
}
