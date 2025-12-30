import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      name: "test1",
      password: bcrypt.hashSync("12345"),
      roles: ["admin"],
      todos: {
        create: [
          {
            description: "Piedra del alma",
            completed: true,
          },
          {
            description: "Piedra del poder",
            completed: true,
          },
          {
            description: "Piedra del tiempo",
          },
          {
            description: "Piedra del espacio",
          },
          {
            description: "Piedra del realidad",
            completed: true,
          },
        ],
      },
    },
  });

  return NextResponse.json({ message: "Seed Executed" });
}
