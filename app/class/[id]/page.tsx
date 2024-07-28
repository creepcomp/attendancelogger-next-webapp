import React from "react";
import AttendanceForm from "./AttendanceForm";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import { getClass } from "./actions";

export default async function page({ params }: { params: { id: number } }) {
  const classId = Number(params.id);
  if (!classId) return notFound();
  const _class = await getClass(classId);
  if (!_class) return notFound();

  return (
    <div>
      <AttendanceForm __class={_class} />
    </div>
  );
}
