import React, { useState, useEffect } from "react";
import "../index.css";

const apiKey = "42a126f0"; 
const moviesPerPage = 15;

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=top+rated&type=movie&page=${currentPage}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search); 
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(100 / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Top Rated Movies</h1>
      <p className="text-gray-700">
        Discover the movies that have received the highest ratings and love from fans and critics worldwide.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
        {movies.map((movie, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
              alt="Movie Poster"
              className="rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{movie.Title}</h2>
            <p className="text-gray-600">{movie.Year} • {movie.Type}</p>
            <p className="text-yellow-500 font-semibold">⭐ {movie.imdbRating}/10</p>
            <button
              onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")}
              className="mt-3 text-blue-500 hover:underline"
            >
              More Details
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TopRated;
