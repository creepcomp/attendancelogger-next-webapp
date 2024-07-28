"use client";
import React from "react";
import { deleteClass, getClasses } from "./actions";
import Link from "next/link";

export default function ClassList() {
  const [message, setMessage] = React.useState("");
  const [classes, setClasses] = React.useState([] as any);

  const update = async () => {
    const classes = await getClasses();
    setClasses(classes);
  };

  React.useEffect(() => {
    update();
  }, []);

  const handleDelete = async (classId: number) => {
    const result = await deleteClass(classId);
    if (result.success) await update();
    setMessage(result.message);
  };

  return (
    <ul className="menu">
      {classes.map((x: any) => (
        <li key={x.id} className="active">
          <Link href={`/class/${x.id}`}><i className="fas fa-users"></i> {x.name}</Link>
        </li>
      ))}
      <li>
        <Link href="/class/create"><i className="fa fa-plus" /> Create Class</Link>
      </li>
    </ul>
  );
}
