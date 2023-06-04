import { getTodos } from "@lib/mongodb/todos";

// https://swr.vercel.app/
import useSWR from "swr";
async function fetchTodos() {
  const { todos } = await getTodos();
  if (!todos) throw new Error("Failed to fetch movies");

  return todos;
}

export default async function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/hello",
    fetcher
  );
  const todos = await fetchTodos();
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
}
