'use client';

import { TodoCard } from "@/todos/components/TodoCard";
import { Todo } from "@/generated/prisma/client";
import { NoTodos } from "@/todos/components/NoTodos";

//import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";
import { toggleTodo, deleteTodo } from "@/todos/actions/todos-actions";

interface Props {
  todos: Todo[];
}

export const TodosGrid = ({ todos }: Props) => {

  if (!todos || todos.length === 0) {
    return <NoTodos />;
  }

  const router = useRouter();

  /* const toggleTodo = async (id: string, completed: boolean) => {
    const updatedTodo = await todosApi.updateTodo(id, completed);
    console.log("Updated Todo:", updatedTodo);
    router.refresh();
  }; */

  /* const deleteTodo = async (id: string) => {
    const deletedTodo = await todosApi.deleteTodo(id);
    console.log("Deleted Todo:", deletedTodo);
    router.refresh();
  }; */

  return (
    <>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      ))}
    </>
  );
};
