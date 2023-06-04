import { getMovies } from "@lib/mongodb/movies";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { movies, err } = await getMovies();
    if (err) throw new Error(err);

    return NextResponse.json({ movies });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }

  // res.setHeader("Allow", ["GET"]);
  // res.status(405).end(`Method ${req.method} is not allowed`);
}
// !!! FOR PAGES ROUTER
// import { getMovies } from "@lib/mongodb/movies";

// const handler = async (req, res) => {
//   if (req.method === "GET") {
//     try {
//       const { movies, error } = await getMovies();
//       if (error) throw new Error(error);

//       return res.status(200).json({ movies });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
//   res.setHeader("Allow", ["GET"]);
//   res.status(405).end(`Method ${req.method} is not allowed`);
// };

// export default handler;
