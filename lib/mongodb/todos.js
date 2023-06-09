import clientPromise from "./mongodb";

let client;
let db;
let todosCollection;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    todosCollection = await db.collection("todos");
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
    if (!todosCollection) await init();
    const result = await todosCollection
      .find({})
      // .limit(20)
      // .map((todo) => ({ ...todo, is: todo._id.toString() }))
      .toArray();

    return { todos: result };
  } catch (err) {
    return { error: "Failed to fetch todos" };
  }
}
export async function postTodo() {
  try {
    if (!todosCollection) await init();
    let result = await todosCollection
      .find({})
      .update({ name: "Eat" }, { $set: { name: "Eat2" } })
      // .limit(20)
      // .map((todo) => ({ ...todo, is: todo._id.toString() }))
      .toArray();

    return { todos: result };
  } catch (err) {
    return { error: "Failed to fetch todos" };
  }
}
