import React, { useState } from "react";
import './index.css';
import Slide from "./components/Slide";
import Home from "./components/Home";
import Recent from "./components/Recent";
import TopRated from "./components/TopRated";
import GreatOfAllTime from "./components/GreatofAllTime";
import Fav from "./components/Fav";

function App() {
  const [selectedContent, setSelectedContent] = useState("Home");

  const handleMenuClick = (menu) => {
    setSelectedContent(menu);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "Home":
        return <Home />;
      case "Recent":
        return <Recent />;
      case "Top Rated":
        return <TopRated />;
      case "Great of All Time":
        return <GreatOfAllTime />;
      case "Fav":
        return <Fav />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex">
      <Slide onMenuClick={handleMenuClick} />

      <div className="flex-1 p-5 bg-gray-100">{renderContent()}</div>
    </div>
  );
}

export default App;
