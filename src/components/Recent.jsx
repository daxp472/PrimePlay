import React, { useState, useEffect } from "react";
import "../index.css";

function Recent() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20; // Show 20 movies per page
  const totalPages = Math.ceil(100 / moviesPerPage); // You can change 100 to the total number of movies you have

  const apiKey = "42a126f0"; // OMDb API key

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieTitles = [
          "The Flash", "Guardians of the Galaxy Vol. 3", "Spider-Man: Across the Spider-Verse", "Mission Impossible 7", "The Marvels",
          "Avengers: Endgame", "Inception", "The Dark Knight", "Titanic", "The Godfather", "Forrest Gump", "The Shawshank Redemption", "Pulp Fiction", "The Matrix",
          "The Lion King", "Jurassic Park", "Star Wars: A New Hope", "The Avengers", "Frozen II", "The Lord of the Rings: The Fellowship of the Ring",
          "The Hunger Games", "Harry Potter and the Sorcerer's Stone", "The Twilight Saga: Breaking Dawn", "Black Panther", "Wonder Woman", "Shazam!",
          "Doctor Strange", "Deadpool", "Logan", "Thor: Ragnarok", "Aquaman", "Guardians of the Galaxy", "The Incredibles", "Zootopia", "Finding Nemo", "Monsters, Inc.",
          "Pirates of the Caribbean: The Curse of the Black Pearl", "Spider-Man: Homecoming", "Wonder Woman 1984", "Black Widow", "Iron Man", "Ant-Man", "Captain America: The Winter Soldier",
          "Transformers: Dark of the Moon", "Jurassic World", "Avatar", "King Kong", "The Hobbit: An Unexpected Journey", "Avatar: The Way of Water", "Jumanji: Welcome to the Jungle",
          "Skyfall", "Spectre", "Casino Royale", "The Bourne Identity", "Mission: Impossible – Fallout", "Mad Max: Fury Road", "The Fast and the Furious", "Pacific Rim",
          "X-Men: Days of Future Past", "The Equalizer", "Logan", "The Martian", "Interstellar", "The Revenant", "The Big Short", "American Sniper", "12 Years a Slave",
          "The Social Network", "The Wolf of Wall Street", "Spotlight", "La La Land", "The Shape of Water", "Birdman", "Whiplash", "The Favourite", "Three Billboards Outside Ebbing, Missouri",
          "The Grand Budapest Hotel", "Once Upon a Time in Hollywood", "Get Out", "Knives Out", "Parasite", "The Irishman", "Green Book", "Bohemian Rhapsody", "Rocketman", "A Star Is Born",
          "Jojo Rabbit", "Marriage Story", "Ford v Ferrari", "1917", "The Trial of the Chicago 7", "Joker", "Midsommar", "The Lighthouse", "Hereditary", "A Quiet Place",
          "It", "It: Chapter Two", "The Conjuring", "Annabelle", "Sinister", "The Nun", "Insidious", "The Ring", "The Purge", "Get Out", "The Invisible Man", "The Haunting of Hill House",
          "Halloween", "Scream", "Friday the 13th", "Nightmare on Elm Street", "The Texas Chain Saw Massacre", "The Shining", "Bird Box", "Don't Breathe", "Ready or Not", "The Witch",
          "The Babadook", "The Cabin in the Woods", "Hereditary", "The Conjuring 2", "It Follows", "Us", "Annabelle: Creation", "A Quiet Place", "The Grudge", "Zombieland", "World War Z",
          "Dawn of the Dead", "Shaun of the Dead", "Resident Evil", "Escape Room", "The Maze Runner", "Divergent", "The Hunger Games: Catching Fire", "Maze Runner: The Scorch Trials",
          "World War Z", "The Girl with the Dragon Tattoo", "Gone Girl", "Prisoners", "Shutter Island", "Seven", "Mystic River", "The Sixth Sense", "The Others", "The Prestige", "The Illusionist",
          "Fight Club", "American Psycho", "Requiem for a Dream", "Donnie Darko", "Trainspotting", "A Clockwork Orange", "Scarface", "Goodfellas", "Heat", "Casino", "The Departed", "Pulp Fiction",
          "Reservoir Dogs", "The Usual Suspects", "American History X", "The Godfather Part II", "The Dark Knight Rises", "The Hateful Eight", "Django Unchained", "Inglourious Basterds", "Kill Bill",
          "Mad Max: Fury Road", "The Big Lebowski", "The Royal Tenenbaums", "Moonrise Kingdom", "The Grand Budapest Hotel", "The Life Aquatic with Steve Zissou", "Rushmore", "Fantastic Mr. Fox",
          "The Darjeeling Limited", "The French Dispatch", "The Island", "Ocean's Eleven", "Ocean's Twelve", "Ocean's Thirteen", "Inside Man", "Now You See Me", "The Italian Job", "The Thomas Crown Affair",
          "Heat", "The Town", "The Score", "The Departed", "Drive", "Baby Driver", "Ocean's Eight", "Money Heist", "Breaking Bad", "Narcos", "Stranger Things", "The Witcher", "The Mandalorian",
          "Westworld", "Game of Thrones", "The Handmaid's Tale", "The Crown", "Fargo", "Chernobyl", "The Boys", "Vikings", "True Detective", "The Walking Dead"
        ];
        

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

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // Calculate the movies to show for the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Recent Movies</h1>
      <p className="text-gray-700">
        Check out the latest movies that have recently been released in theaters and online platforms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {currentMovies.map((movie, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition duration-200"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
              alt="Movie Poster"
              className="rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{movie.Title}</h2>
            <p className="text-gray-600">
              {movie.Year} • {movie.Genre} • {movie.imdbRating}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-4">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">{selectedMovie.Title}</h2>
            <div className="relative aspect-w-16 aspect-h-9">
              <iframe
                title="Movie Trailer"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedMovie.imdbID}?autoplay=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-semibold">Rating: {selectedMovie.imdbRating}</p>
              <p>Language: {selectedMovie.Language}</p>
              <p>Duration: {selectedMovie.Runtime}</p>
              <p>Genre: {selectedMovie.Genre}</p>
              <p>Actors: {selectedMovie.Actors}</p>
              <p className="mt-4">{selectedMovie.Plot}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 text-white bg-red-500 py-2 px-4 rounded-full w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recent;
