"use server";
import prisma from "@/prisma/db";
import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login({ email, password }: any) {
  try {
    if (!process.env.SECRET) throw new Error("SECRET environment variable is not set.");
    if (!email || !password) return { message: "Missing required fields.", success: false };
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) return { message: "User not found." };
    if (!await bcrypt.compare(password, user.password)) return { message: "Invalid password.", success: false };
    const session = jwt.sign({ user: user.id }, process.env.SECRET);
    cookies().set("session", session, { secure: true, httpOnly: true });
    return { message: "You have successfully logged in.", success: true };
  } catch (err: any) {
    throw new Error(err);
  }
}
