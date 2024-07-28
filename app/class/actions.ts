"use server";
import prisma from "@/prisma/db";
import { getUser } from "../server/auth";

export async function getClasses() {
  const user = await getUser();
  if (!user) return { message: "User not found!", success: false };
  return await prisma.class.findMany({
    where: {
      instructorId: user.id
    }
  });
}

export async function deleteClass(classId: number) {
  try {
    const user = await getUser();
    if (!user) return { message: "User not found!", success: false };
    const _class = await prisma.class.findUnique({ where: { id: classId } });
    if (!_class) return { message: "Class not found!", success: false };
    if (user.id !== _class.instructorId) return { message: "You are not instructor of this class.", success: false };
    await prisma.class.delete({ where: { id: classId } });
    return { message: "Your class has been successfully deleted.", success: true };
  } catch (err: any) {
    throw new Error(err);
  }
}
