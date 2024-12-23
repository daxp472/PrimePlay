import React, { useState, useEffect } from "react";
import "../index.css";

const apiKey = "9d47d32f05341b5f7497dcf453faccaf"; 

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const totalPages = 15;

  const fetchMovies = async (page, query = "trending") => {
    setLoading(true);
    try {
      let url = "";
      if (query === "trending") {
        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,credits`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      fetchMovies(currentPage);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(1, searchTerm);
  };

  const renderMovies = () => {
    return movies.map((movie) => (
      <div
        key={movie.id}
        onClick={() => fetchMovieDetails(movie.id)}
        className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x400"
          }
          alt={movie.title}
          className="rounded-md mb-4 w-full h-60 object-cover"
        />
        <h2 className="text-lg font-bold text-gray-800 text-center">
          {movie.title}
        </h2>
        <p className="text-gray-600 text-center">{movie.release_date}</p>
      </div>
    ));
  };

  return (
    <div className="flex min-h-screen">
      <div className="ml-64 flex-1 p-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fetchMovies(1, "trending")}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
            >
              Trending
            </button>
            <select
              className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            >
              <option value="all">Categories</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
            </select>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for movies..."
              className="p-2 w-80 bg-gray-800 text-white rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="text-white text-center text-2xl col-span-full">
              Loading...
            </div>
          ) : movies.length > 0 ? (
            renderMovies()
          ) : (
            <div className="text-white text-center text-xl col-span-full">
              No movies found.
            </div>
          )}
        </div>

        <div className="flex justify-center mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg mr-2 hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {selectedMovie && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-5 w-full max-w-4xl relative">
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
              <div className="flex flex-col md:flex-row">
                <img
                  src={
                    selectedMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                      : "https://via.placeholder.com/300x400"
                  }
                  alt={selectedMovie.title}
                  className="w-full md:w-1/3 rounded-md mb-4 md:mb-0"
                />
                <div className="md:ml-5">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {selectedMovie.title}
                  </h2>
                  <p className="text-gray-600 mb-1">
                    <strong>Release Date:</strong> {selectedMovie.release_date}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Rating:</strong> {selectedMovie.vote_average}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Language:</strong> {selectedMovie.spoken_languages.map(lang => lang.name).join(", ")}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Duration:</strong> {selectedMovie.runtime} minutes
                  </p>
                  <p className="text-gray-800 mb-3">{selectedMovie.overview}</p>
                  <div className="flex space-x-4">
                    {selectedMovie.credits.cast.slice(0, 5).map((actor) => (
                      <div key={actor.id} className="text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="rounded-full w-20 h-20 mx-auto mb-2"
                        />
                        <p className="text-gray-800">{actor.name}</p>
                      </div>
                    ))}
                  </div>
                  {selectedMovie.videos.results.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-800">Trailer</h3>
                      <iframe
                        className="w-full h-64"
                        src={`https://www.youtube.com/embed/${selectedMovie.videos.results[0].key}`}
                        title="Trailer"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
