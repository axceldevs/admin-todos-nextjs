'use client';
import style from "./TodoItem.module.css";
import { startTransition, useOptimistic } from "react";

import { formatDateTime } from "../helpers/todos";
import { IoTrashOutline } from "react-icons/io5";
import { Todo } from "@/generated/prisma/client";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
  deleteTodo: (id: string) => Promise<Todo | void>;
}

export const TodoCard = ({ todo, toggleTodo, deleteTodo }: Props) => {

  const [optimisticTodo, toggleOptimisticTodo] = useOptimistic(todo,
    (currentTodo, newCompleted: boolean) => ({
      ...currentTodo,
      completed: newCompleted,
    })
  );
  
  const handleToggle = async () => {
    try{
      startTransition(() => toggleOptimisticTodo(!optimisticTodo.completed));
      await toggleTodo(optimisticTodo.id, !optimisticTodo.completed);
    }catch(error){
      startTransition(() => toggleOptimisticTodo(!optimisticTodo.completed));
      console.error("Error toggling todo:", error);
    }
  }

  return (
    <div
      key={todo.id}
      className="mb-3 flex items-start gap-4 rounded-xl border border-gray-200 bg-white
               px-5 py-4 transition hover:border-gray-300"
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={optimisticTodo.completed}
        onChange={handleToggle}
        className="mt-1 h-5 w-5 cursor-pointer accent-green-600"
      />

      {/* Contenido */}
      <div className="flex-1">
        <p
          className={`text-sm font-medium transition
          ${optimisticTodo.completed ? style.todoDone : style.todoPending}`}
        >
          {optimisticTodo.description}
        </p>

        <div className="mt-1 flex flex-wrap gap-4 text-xs text-gray-500">
          <span>Creado: {formatDateTime(optimisticTodo.created_at)}</span>
          <span>Actualizado: {formatDateTime(optimisticTodo.updated_at)}</span>
        </div>
      </div>

      {/* Badge estado */}
      <span
        className={`text-xs font-medium px-3 py-1 rounded-full self-start
        ${todo.completed ? style.todoDone : style.todoPending}`}
      >
        {todo.completed ? "Completado" : "Pendiente"}
      </span>
      {todo.completed && (
        <button
          onClick={() => deleteTodo(todo.id)}
          className="self-center flex items-center justify-center rounded-lg bg-red-500 p-2
               text-white hover:bg-red-600 transition"
          title="Eliminar tarea"
        >
          <IoTrashOutline className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
