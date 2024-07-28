"use server";
import { getUser } from "@/app/server/auth";
import prisma from "@/prisma/db";

export async function createClass({ name, startAt, endAt }: any) {
  try {
    const user = await getUser();
    if (!user) return { message: "You are not logged in.", success: false };
    if (!name || !startAt || !endAt) return { message: "Missing required fields.", success: false };
    await prisma.class.create({
      data: {
        name: name,
        instructorId: user.id,
        startAt: new Date(startAt),
        endAt: new Date(endAt)
      }
    });
    return { message: "Your class has been successfully created.", success: true };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
