"use server";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";

export async function register({ email, password, firstname, lastname }: any) {
  try {
    if (!email || !firstname || !lastname || !password) return { message: "Missing required fields.", success: false };
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
      }
    });
    return { message: "Account successfully created.", success: true };
  } catch (err: any) {
    throw new Error(err);
  }
}