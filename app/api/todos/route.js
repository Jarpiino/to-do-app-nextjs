import dbConnect from "@/lib/mongodb/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    await dbConnect();

    await Todo.create(body);

    return NextResponse.json(
      {
        message: "Message sent successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Server error, please try again!" },
      { status: 500 }
    );
  }
}

// export const POST = async (req, res) => {
//   try {
//     console.log("CONNECTING TO MONGO");
//     await dbConnect();
//     console.log("CONNECTED TO MONGO");

//     console.log("CREATING DOCUMENT");
//     const createdUser = await Todo.create(req.body);
//     console.log("CREATED DOCUMENT");
//     res.json(JSON.stringify(createdUser));
//   } catch (error) {}
// };

// export async function POST(req, res) {
//   try {
//     console.log(res.json());
//     const body = res.json();
//     console.log(body);
//     await connect();
//     await Todo.create(body);

//     return NextResponse.json(
//       { message: "Success" },
//       {
//         status: 200,
//       }
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Failed" },
//       {
//         status: 500,
//       }
//     );
//   }
// }
// !!!post
// export const POST = async (req) => {
//   try {
//     const res = await new Todo({
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: req.body,
//     });
//     const todo = await res.json();
//     console.log(todo);
//     todo.save();
//     return new NextResponse(todo);
//   } catch (e) {
//     return new NextResponse("database error", { status: 500 });
//   }
// };

// !!!GET V
// export const GET = async (request) => {
//   try {
//     await dbConnect();
//     const todo = await Todo.find();

//     return new NextResponse(JSON.stringify(todo), { status: 200 });
//   } catch (err) {
//     return new NextResponse("database error", { status: 500 });
//   }
// };

// !Users api endpoint
// import { NextResponse } from "next/server";
// import connect from "@lib/mongodb/mongodb";
// import User from "@models/User";

// export const GET = async (request) => {
//   try {
//     await connect();
//     const users = await User.find();

//     return new NextResponse("users", { status: 200 });
//   } catch (err) {
//     return new NextResponse("database error", { status: 500 });
//   }
// };
