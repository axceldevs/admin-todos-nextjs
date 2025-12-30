import prisma from '@/lib/prisma'
import { Prisma } from "@/generated/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string, ValidationError } from "yup";

interface Segments {
  params: { 
    id: string 
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {

  const idTodo = (await params).id;

  if (!idTodo) {
    return NextResponse.json(
      {
        message: "Bad request",
        method: "GET",
      },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.findFirst({
    where: {
      id: idTodo,
    },
  });

  if (!todo) {
    return NextResponse.json(
      {
        message: "Not found",
        method: "GET"
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: "success",
      method: "GET",
      data: todo,
    },
    { status: 200 }
  );
}

const putSchema = object({
  description: string().optional(),
  completed: boolean().optional(),
});


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) { 
  const idTodo = (await params).id;

  const todo = await prisma.todo.findFirst(
    {
      where: {
        id: idTodo
      }
    }
  )

  if (!todo) {
    return NextResponse.json(
        {
          method: "PUT",
          message: "Invalid data sent to database",
          date: new Date(),
          detail: `Todo con el id "${idTodo}" no existe!!`
        },
        { status: 404 }
      );
  }

  try {
    const {completed, description} = await putSchema.validate(await request.json());
    const updatedTodo = await prisma.todo.update({
      where: {
        id: idTodo
      },
      data: {
        completed,
        description
      }
    });
    return NextResponse.json(
      {
        message: "success",
        date: updatedTodo.updatedAt,
        method: "PUT",
        data: updatedTodo,
      },
      { status: 200 }
    );
  } catch (err: any) {

    console.error(err);

    if (err instanceof ValidationError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: err.errors,
          date: new Date(),
          method: "PUT",
        },
        { status: 400 }
      );
    }

    if (err instanceof Prisma.PrismaClientValidationError
      || err instanceof Prisma.PrismaClientKnownRequestError
    ) {
      return NextResponse.json(
        {
          method: "PUT",
          message: "Invalid data sent to database",
          date: new Date(),
          detail: err.message
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        method: "PUT",
        message: "Internal server error",
        date: new Date()
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const idTodo = (await params).id;

  const todo = await prisma.todo.findFirst(
    {
      where: {
        id: idTodo
      }
    }
  )

  if (!todo) {
    return NextResponse.json(
        {
          method: "DELETE",
          message: "Invalid data sent to database",
          date: new Date(),
          detail: `Todo con el id "${idTodo}" no existe!!`
        },
        { status: 404 }
      );
  }

  try {
    const deletedTodo = await prisma.todo.delete({
      where:{
        id: idTodo
      }
    });
  
    return NextResponse.json(
      {
        message: "success",
        date: new Date(),
        method: "DELETE",
        data: deletedTodo,
      },
      { status: 200 }
    );
  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        method: "DELETE",
        message: "Internal server error",
        date: new Date()
      },
      { status: 500 }
    );
    
  }
}
