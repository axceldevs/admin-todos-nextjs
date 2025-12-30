"use server";

import { Todo } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number) => {
  return new Promise((resolve) => 
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000)
  );  
};

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(3);
  console.log("Toggling todo in action:", { id, completed });
  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    throw new Error(`Todo with id ${id} not found`);
  }
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const createTodo = async (description: string, userId: string): Promise<Todo | { message: string }> => {
    
  try {
    const newTodo = await prisma.todo.create({
      data: {
        description,
        userId: userId
      },
    });

    revalidatePath("/dashboard/server-todos");

    return newTodo;
  } catch (error) {
    return {
      message: "Error creating todo"
    };
  }
};

export const deleteTodo = async (id: string): Promise<Todo> => {

  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    throw new Error(`Todo with id ${id} not found`);
  }

  const deletedTodo = await prisma.todo.delete({
    where: { id },
  });

  console.log("Deleted Todo in action:", deletedTodo);

  revalidatePath("/dashboard/server-todos");

  return deletedTodo;
}
