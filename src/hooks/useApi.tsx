import { useQuery, useMutation } from "react-query";

async function getTodos() {
  const response = await fetch("https://todo-api.roto.codes/choi");
  return response.json();
}

export function useGetTodos() {
  const fallback: string[] = [];
  const { data = fallback } = useQuery("todoList", getTodos);

  return data;
}
