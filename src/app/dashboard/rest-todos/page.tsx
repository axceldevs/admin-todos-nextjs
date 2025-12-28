export const dynamic = "force-dynamic";
export const revalidate = 0;
import prisma from "@/lib/prisma";
import { NewTodo } from "@/todos";
import { TodosGrid } from "@/todos/components/TodosGrid";
import { Todo } from "@/generated/prisma/client";

export default async function RestTodosPage() {
  const todos: Todo[] = await prisma.todo.findMany({
    orderBy: { updated_at: "asc" },
  });
  
  return (
    <>
      <header className="py-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          📝 Gestión de Tareas
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Acciones ejecutadas desde el cliente
        </p>
      </header>
      <div className="mx-auto max-w-4xl space-y-4 p-4">
        <NewTodo />
        <TodosGrid todos={todos} />
      </div>
    </>
  );
}
