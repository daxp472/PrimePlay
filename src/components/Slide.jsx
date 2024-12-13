import React from "react";
import { FaHome, FaStar, FaCrown, FaHeart, FaUser, FaQuestionCircle } from "react-icons/fa";
import { MdRecentActors } from "react-icons/md";
import { GiIndiaGate, GiWorld } from "react-icons/gi"; 

function Slide({ onMenuClick }) {
  return (
    <>
      <div className="slide bg-gray-900 text-white h-screen p-5">
        
        <div className="flex items-center space-x-4">
          <img
            src="https://picsum.photos/100"
            alt="Logo"
            className="rounded-full w-12 h-12"
          />
          <div className="text-xl font-bold">PrimePlay</div>
        </div>

        
        <div className="mt-10">
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-blue-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("Home")}
          >
            <FaHome size={20} /> <span>Home</span>
          </div>
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-green-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("Recent")}
          >
            <MdRecentActors size={20} /> <span>Recent</span>
          </div>
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-yellow-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("Top Rated")}
          >
            <FaStar size={20} /> <span>Top Rated</span>
          </div>
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-purple-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("Great of All Time")}
          >
            <FaCrown size={20} /> <span>Great of All Time</span>
          </div>
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-red-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("Fav")}
          >
            <FaHeart size={20} /> <span>Fav</span>
          </div>
        </div>

        
        <div className="mt-10">
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-indigo-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("Hindi")}
          >
            <GiIndiaGate size={20} /> <span>Hindi</span>
          </div>
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-pink-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("English")}
          >
            <GiWorld size={20} /> <span>English</span>
          </div>
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-teal-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("My Account")}
          >
            <FaUser size={20} /> <span>My Account</span>
          </div>
          <div
            className="py-2 px-4 flex items-center space-x-4 hover:border-b-4 border-orange-500 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuClick("Help")}
          >
            <FaQuestionCircle size={20} /> <span>Help</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slide;
