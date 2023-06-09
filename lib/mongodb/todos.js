import clientPromise from "./mongodb";

let client;
let db;
let todos;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    todos = await db.collection("todos");
  } catch (e) {
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();
/////////////
/// TODOS ///
/////////////

export async function getTodos() {
  try {
    if (!todos) await init();
    const result = await todos
      .find({})
      .limit(20)
      .map((todo) => ({ ...todo, is: todo._id.toString() }))
      .toArray();

    return { todos: result };
  } catch (err) {
    return { error: "Failed to fetch movies" };
  }
}
