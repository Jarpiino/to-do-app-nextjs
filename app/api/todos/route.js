import { getTodos } from "@lib/mongodb/todos";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { todos, err } = await getTodos();
    if (err) throw new Error(err);

    return NextResponse.json({ todos });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }

  // res.setHeader("Allow", ["GET"]);
  // res.status(405).end(`Method ${req.method} is not allowed`);
}
