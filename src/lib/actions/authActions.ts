"use server";

import db from "@/db/db";
import { User } from "@prisma/client";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image" | "createdAt" | "updatedAt">
) {
  const result = await db.user.create({
    data: user,
  });
  return result;
}
