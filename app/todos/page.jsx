import { getTodos } from "@lib/mongodb/todos";

async function fetchTodos() {
  const { todos } = await getTodos();
  if (!todos) throw new Error("Failed to fetch movies");

  return todos;
}

export default async function Home() {
  const todos = await fetchTodos();
  console.log(todos);
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}
