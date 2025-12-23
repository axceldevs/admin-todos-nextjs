import { Todo } from "@prisma/client";

export const createTodo = async (
  description: string,
): Promise<Todo> => {
  const body = { description };
  const todo = await fetch(`/api/v1/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return todo.data;
};

export const updateTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  const body = { completed };
  const todo = await fetch(`/api/v1/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return todo.data;
};

export const deleteTodo = async (id: string): Promise<Todo> => {
  const todo = await fetch(`/api/v1/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return todo.data;
}

export const formatDateTime = (date: Date | string) =>
  new Date(date).toLocaleString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
