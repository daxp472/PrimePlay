import React, { useState, useEffect } from "react";
import "../index.css";

const apiKey = "42a126f0";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = 15; 

  
  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&page=${page}`
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

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

 
  const searchMovies = () => {
    return movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  
  const renderMovies = () => {
    const moviesToDisplay = searchTerm ? searchMovies() : movies;
    return moviesToDisplay.map((movie, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
          alt="Movie Poster"
          className="rounded-md mb-4 transition duration-500 hover:opacity-80"
        />
        <h2 className="text-xl font-bold hover:text-blue-500">{movie.Title}</h2>
        <p className="text-gray-600">{movie.Year} • {movie.Type}</p>
        <p className="text-yellow-500 font-semibold">⭐ {movie.imdbRating}/10</p>
        <button
          onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")}
          className="mt-3 text-blue-500 hover:underline"
        >
          More Details
        </button>
      </div>
    ));
  };

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-4 text-center text-gradient">Welcome to the Movie World</h1>

      <div className="flex justify-center mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/3 p-2 border-2 border-gray-300 rounded-lg"
          placeholder="Search for movies..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          renderMovies()
        )}
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

export default Home;
