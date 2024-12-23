import React, { useState, useEffect } from "react";
import "../index.css";

const apiKey = "42a126f0";
const moviesPerPage = 20;

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const movieTitles = [
    "The Flash", "The Walking Dead"
  ];



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await Promise.all(
          movieTitles.map((title) =>
            fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
              .then((response) => response.json())
              .then((data) => data)
          )
        );

        setMovies(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredMovies = movies.filter((movie) =>
    movie.Title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  if (loading) return <div className="text-center mt-20 text-2xl">Loading...</div>;

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search movies..."
        className="search-input"
      />

      {/* Movie list */}
      <div className="movie-list">
        {currentMovies.map((movie) => (
          <div key={movie.imdbID} onClick={() => handleMovieClick(movie)}>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <div className="modal">
          <button onClick={closeModal}>Close</button>
          <div>
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Plot}</p>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TopRated;
