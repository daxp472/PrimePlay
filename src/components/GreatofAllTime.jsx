import React from "react";
import "../index.css";

function GOAT() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Greatest of All Time (GOAT)</h1>
      <p className="text-gray-700">
        Here are some of the greatest movies of all time that have left a lasting impact on cinema and audiences worldwide.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Movie Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/300x400"
            alt="Movie Poster"
            className="rounded-md mb-4"
          />
          <h2 className="text-xl font-bold">The Shawshank Redemption</h2>
          <p className="text-gray-600">1994 • Drama</p>
        </div>

        {/* Movie Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/300x400"
            alt="Movie Poster"
            className="rounded-md mb-4"
          />
          <h2 className="text-xl font-bold">The Godfather</h2>
          <p className="text-gray-600">1972 • Crime, Drama</p>
        </div>

        {/* Movie Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/300x400"
            alt="Movie Poster"
            className="rounded-md mb-4"
          />
          <h2 className="text-xl font-bold">The Dark Knight</h2>
          <p className="text-gray-600">2008 • Action, Crime</p>
        </div>
      </div>
    </div>
  );
}

export default GOAT;
