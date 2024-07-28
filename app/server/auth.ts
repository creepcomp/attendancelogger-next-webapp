"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/prisma/db";

export async function getUser() {
  try {
    if (!process.env.SECRET) throw new Error("SECRET environment variable is not set.");
    const cookieStore = cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return false;
    const data = jwt.verify(session, process.env.SECRET) as any;
    return await prisma.user.findUnique({ where: { id: data.user } });
  } catch (err: any) {
    throw new Error(err);
  }
}
