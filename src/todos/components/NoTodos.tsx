interface NoTodosProps {
  message?: string;
}

export const NoTodos = ({ message = "No hay tareas aún" }: NoTodosProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <p className="text-lg font-medium">{message}</p>
      <span className="text-sm">Agrega una nueva tarea para comenzar</span>
    </div>
  );
};