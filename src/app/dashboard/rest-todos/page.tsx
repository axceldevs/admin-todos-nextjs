import prisma  from "@/lib/prisma";
import { NewTodo } from "@/todos";
import { TodosGrid } from "@/todos/components/TodosGrid";
import { Todo } from "@/generated/prisma/client";

export default async function RestTodosPage() {
  const todos: Todo[] = await prisma.todo.findMany({
    orderBy: { updated_at: "asc" },
  });

  console.log("Todos:", todos);

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
