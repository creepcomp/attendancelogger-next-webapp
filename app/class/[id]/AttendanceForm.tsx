"use client";
import React from "react";
import { delUser, getClass, saveAttendance } from "./actions";
import AddUser from "./AddUser";

export default function AttendanceForm({ __class }: any) {
  const [message, setMessage] = React.useState("");
  const [_class, setClass] = React.useState(__class);

  const update = async () => {
    const _class = await getClass(__class.id);
    setClass(_class);
  };

  React.useEffect(() => {
    update();
  }, []);

  const startDate = new Date(_class.startAt);
  const endDate = new Date(_class.endAt);
  const dates: Date[] = [];
  while (startDate <= endDate) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  const isChecked = (classUserId: number, date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return _class.classUsers
      .find((user: any) => user.id === classUserId)
      ?.attendances.some((attendance: any) => new Date(attendance.datetime).toISOString().split("T")[0] === dateString);
  };  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const attendanceData = _class.classUsers.flatMap((x: any) => {
      return dates.map(date => {
        const dateString = date.toISOString().split("T")[0];
        return {
          classUserId: x.id,
          datetime: dateString,
          present: formData.get(`${x.id}-${dateString}`) === "on",
        };
      });
    });
    const result = await saveAttendance(attendanceData);
    setMessage(result.message);
  };

  const handleDeleteUser = async (classUserId: number) => {
    const result = await delUser(classUserId);
    if (result.success) await update();
    setMessage(result.message);
  };

  return (
    <div className="container m-auto">
      {_class.classUsers.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {message ? <div className="alert">{message}</div> : null}
          <div className="overflow-auto container m-auto">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  {dates.map(date => (
                    <th key={date.toISOString()}>{date.getFullYear()}/{date.getMonth()}/{date.getDay()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {_class.classUsers.map((x: any) => (
                  <tr className="hover" key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.user.firstname} {x.user.lastname}</td>
                    {dates.map(date => (
                      <td key={date.toISOString()}>
                        <label className="swap">
                          <input type="checkbox" name={`${x.id}-${date.toISOString().split("T")[0]}`} defaultChecked={isChecked(x.id, date)} />
                          <i className="swap-on fa fa-check" />
                          <i className="swap-off fa fa-xmark" />
                        </label>
                      </td>
                    ))}
                    <td>
                      <button className="btn btn-error btn-sm" onClick={() => handleDeleteUser(x.id)}>
                        <i className="fa fa-xmark" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="block btn btn-primary btn-sm mx-auto">Save</button>
        </form>
      ): (
        <div className="alert alert-info">Your class is empty, first add some users ..</div>
      )}
      <AddUser _class={_class} />
    </div>
  );
}
