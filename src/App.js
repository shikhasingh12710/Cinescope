import { useState } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const searchMovie = async () => {
    if (!query.trim()) return;

    const apiKey = process.env.REACT_APP_OMDB_API_KEY;

    const response = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${apiKey}`
    );

    const data = await response.json();

    if (data.Response === "True") {
      setMovie(data);
      setError("");
    } else {
      setMovie(null);
      setError(data.Error);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🎬 CineScope</h1>
      <p className="subtitle">Discover movies instantly</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovie()}
        />
        <button onClick={searchMovie}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {movie && <MovieCard movie={movie} />}
    </div>
  );
}

export default App;
