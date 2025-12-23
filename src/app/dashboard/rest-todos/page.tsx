import { prisma } from "@/lib/prisma";
import { NewTodo } from "@/todos";
import { TodosGrid } from "@/todos/components/TodosGrid";
import { Todo } from "@prisma/client";

export default async function RestTodosPage() {
  const todos: Todo[] = await prisma.todo.findMany({
    orderBy: { updated_at: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
