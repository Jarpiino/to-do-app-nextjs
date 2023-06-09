import { postTodo } from "@lib/mongodb/todos";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { todos, err } = await postTodo();
    console.log(todos);
    if (err) throw new Error(err);

    return NextResponse.json({ todos });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }

  // res.setHeader("Allow", ["GET"]);
  // res.status(405).end(`Method ${req.method} is not allowed`);
}
