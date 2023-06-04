import { getMovies } from "@lib/mongodb/movies";

async function fetchMovies() {
  const { movies } = await getMovies();
  if (!movies) throw new Error("Failed to fetch movies");

  return movies;
}

export default async function Home() {
  const movies = await fetchMovies();
  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
