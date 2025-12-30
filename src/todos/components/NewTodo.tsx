"use client";

import { FormEvent, useState } from "react";
//import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";
import { createTodo } from "@/todos/actions/todos-actions";
import { getUserSessionFromClient } from "@/auth/actions/auth-actions-client";

export const NewTodo = () => {

  const user = getUserSessionFromClient()

  const [description, setDescription] = useState("");

  //const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    
    e.preventDefault();
    if (description.trim().length === 0) return;
    const newTodo = await createTodo(description, user.id);
    console.log("Created Todo:", newTodo);
    setDescription("");
    //router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <input
        onChange={ (e) => setDescription(e.target.value) }
        value={description}
        type="text"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-sky-500 transition"
        placeholder="¿Qué necesita ser hecho?"
      />
      <button
        type="submit"
        className="flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2 text-white hover:bg-sky-600 transition font-medium"
      >
        Crear
      </button>
    </form>
  );
};
