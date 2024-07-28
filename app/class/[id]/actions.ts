"use server";
import { getUser } from "@/app/server/auth";
import prisma from "@/prisma/db";

export async function getClass(classId: number) {
  return await prisma.class.findUnique({
    where: { id: classId },
    include: {
      instructor: true,
      classUsers: {
        include: {
          user: true,
          attendances: true
        }
      }
    }
  });
}

export async function findUser(searchTerm: string) {
  return (await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: searchTerm } },
        { firstname: { contains: searchTerm } },
        { lastname: { contains: searchTerm } },
      ]
    }
  })).splice(0, 3);
}

export async function addUser(classId: number, userId: number) {
  try {
    const check = await prisma.classUser.findFirst({
      where: {
        classId: classId,
        userId: userId
      }
    });
    if (check) return { message: "The user is already in the class.", success: false };
    await prisma.classUser.create({
      data: {
        userId: userId,
        classId: classId
      }
    });
    return { message: "The user successfully added to the class.", success: true };
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function delUser(classUserId: number) {
  try {
    const user = await getUser();
    if (!user) return {message: "User not found!", success: false};
    const classUser = await prisma.classUser.findUnique({ where: { id: classUserId }, include: { class: true } });
    if (user.id !== classUser?.class.instructorId) return { message: "You are not instructor of this user class.", success: false };
    await prisma.classUser.delete({ where: { id: classUserId } });
    return { message: "The user successfully deleted from the class.", success: true };
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function saveAttendance(attendanceData: any) {
  try {
    await prisma.$transaction(
      attendanceData.map((data: any) => {
        if (data.present) {
          // If present, create or ensure the record exists
          return prisma.attendance.upsert({
            where: {
              classUserId_datetime: {
                classUserId: data.classUserId,
                datetime: new Date(data.datetime),
              },
            },
            update: {},
            create: {
              classUserId: data.classUserId,
              datetime: new Date(data.datetime),
            },
          });
        } else {
          // If not present, delete the record if it exists
          return prisma.attendance.deleteMany({
            where: {
              classUserId: data.classUserId,
              datetime: new Date(data.datetime),
            },
          });
        }
      })
    );
    return { message: "Attendance saved successfully.", success: true };
  } catch (err: any) {
    throw new Error(err);
  }
}
