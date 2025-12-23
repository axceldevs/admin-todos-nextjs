import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string } from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      {
        message: "take debe ser un número",
      },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      {
        message: "skip debe ser un número",
      },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json({
    todos,
  });
}

const postSchema = object({
  description: string().required(),
  completed: boolean().optional().default(false),
});

export async function POST(request: Request) {
  
  try {
    const {completed, description} = await postSchema.validate(await request.json());
    const savedTodo = await prisma.todo.create({
      data: {
        completed,
        description
      },
    });
    return NextResponse.json(
      {
        message: "success",
        date: savedTodo.created_at,
        method: "POST",
        data: savedTodo,
      },
      { status: 201 }
    );
  } catch (err: any) {

    if (err.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: err.errors,
          date: new Date(),
          method: "POST",
        },
        { status: 400 }
      );
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        {
          method: "POST",
          message: "Invalid data sent to database",
          date: new Date(),
          detail: err.message
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        method: "POST",
        message: "Internal server error",
        date: new Date()
      },
      { status: 500 }
    );
  }
}
