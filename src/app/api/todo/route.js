import { ObjectId } from "mongoose";
import dbConnect from "@/utils/dbConnect";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  try {
    const body = await req.json();
    const filter = { _id: body._id };
    const update = { todoname: body.todoname };
    await dbConnect();
    await Todo.findOneAndUpdate(filter, update);
    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Server error, please try again!" },
      { status: 500 }
    );
  }
}
export async function POST(req, res) {
  try {
    const body = await req.json();
    await dbConnect();
    await Todo.create(body);
    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Server error, please try again!" },
      { status: 500 }
    );
  }
}

// !!!GET V
export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    // console.log(session.data.user.name);
    await dbConnect();
    const todo = await Todo.find({ userid: id });

    return new NextResponse(JSON.stringify(todo), { status: 200 });
  } catch (err) {
    return new NextResponse("database error", { status: 500 });
  }
};
