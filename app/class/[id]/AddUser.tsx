"use client";
import React from "react";
import { addUser, findUser } from "./actions";

export default function AddUser({ _class }: any) {
  const [users, setUsers] = React.useState([] as any);
  const [message, setMessage] = React.useState("");
  const modal = React.createRef<HTMLDivElement>() as any;

  const handleAddUser = async (user: any) => {
    const result = await addUser(_class.id, user.id);
    setMessage(result.message);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const users = await findUser(e.target.value);
    setUsers(users);
  };

  return (
    <div className="text-center">
      <button className="btn btn-secondary btn-sm m-2" onClick={() => modal.current.showModal()}>Add User</button>
      <dialog className="modal" ref={modal}>
        <div className="modal-box">
          {message ? <div className="alert my-1">{message}</div> : null}
          <input className="input w-full" placeholder="Search user by (email, firstname, lastname)" onChange={handleChange} />
          <table className="table">
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleAddUser(user)}>
                    <i className="fa-solid fa-plus" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
