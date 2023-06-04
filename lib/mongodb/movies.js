import clientPromise from "./mongodb";

let client;
let db;
let movies;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    movies = await db.collection("movies");
  } catch (e) {
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();
//////////////
/// MOVIES ///
//////////////

export async function getMovies() {
  try {
    if (!movies) await init();
    const result = await movies
      .find({})
      .limit(20)
      .map((user) => ({ ...user, is: user._id.toString() }))
      .toArray();

    return { movies: result };
  } catch (err) {
    return { error: "Failed to fecth movies" };
  }
}
