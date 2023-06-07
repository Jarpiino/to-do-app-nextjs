"use client";
import useSWR from "swr";

// import { getTodos } from "@lib/mongodb/todos";

// async function fetchTodos() {
//   const { todos } = await getTodos();
//   if (!todos) throw new Error("Failed to fetch movies");

//   return todos;
// }

export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/todos",
    fetcher
  );
  if (error) return <div className="text-5xl">failed to load</div>;
  if (isLoading) return <div className="text-5xl">loading...</div>;

  // ! gets todos from mongodb Object
  let todos = Object.entries(data);
  todos = todos[0][1];
  console.log(todos);

  // const todos = await fetchTodos();
  // console.log(todos[2].name);
  // let changeTodos = Object.entries(todos);
  // changeTodos = Object.entries(changeTodos[0][1]);
  // changeTodos = Object.entries(changeTodos[1][1][0]);
  // console.log(Object.entries(changeTodos));
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.name} {todo.completed.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
