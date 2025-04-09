import React, { useState, useEffect, useRef } from "react";
import "./Profile.css"; // Profile Styles
import players from "./players"; // Player Data

const Profile = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null); // Track auto-scroll interval
  const isScrollingRef = useRef(false); // Track manual scrolling

  // Function to start auto-scroll
  const startAutoScroll = () => {
    if (!autoScrollRef.current) {
      autoScrollRef.current = setInterval(() => {
        if (scrollRef.current && !isScrollingRef.current) {
          scrollRef.current.scrollBy({ left: 50, behavior: "smooth" });
        }
      }, 1500);
      
    }
  };

  // Function to stop auto-scroll
  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Effect to start auto-scroll on mount
  useEffect(() => {
    startAutoScroll();

    return () => stopAutoScroll(); // Cleanup on unmount
  }, []);

  // Handle player selection (stop scrolling)
  const handlePlayerClick = (player) => {
    stopAutoScroll();
    setSelectedPlayer(player);
  };

  // Handle closing player details (resume scrolling)
  const closeDetails = () => {
    setSelectedPlayer(null);
    startAutoScroll(); // Restart scrolling
  };

  // Detect manual scrolling and pause auto-scroll
  const handleScroll = () => {
    const scrollElement = scrollRef.current;
    isScrollingRef.current = true;
    stopAutoScroll();
  
    // Check if the user has reached the ends
    if (scrollElement) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
      const atStart = scrollLeft === 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth;
  
      if (!atStart && !atEnd) {
        setTimeout(() => {
          isScrollingRef.current = false;
          if (!selectedPlayer) startAutoScroll(); // Resume only if no player is selected
        }, 5000); // Resume auto-scroll after 5 sec
      }
    }
  };
  

  return (
    <div className="profile-container">
      <h2>Player Profiles</h2>

      {/* Player Scrolling List */}
      <div className="player-scroll-wrapper" onScroll={handleScroll}>
        <div
          className={`player-scroll-container ${selectedPlayer ? "paused" : ""}`} // Add paused class
          ref={scrollRef}
        >
          {[...players, ...players].map((player, index) => (
            <img
              key={index}
              src={player.image}
              alt={player.name}
              className={`player-photo ${
                selectedPlayer?.id === player.id ? "active" : ""
              }`}
              onClick={() => handlePlayerClick(player)}
            />
          ))}
        </div>
      </div>

      {/* Player Details Section */}
      {selectedPlayer && (
        <div className="player-details active">
          <h2>{selectedPlayer.name}</h2>
          <p>{selectedPlayer.details}</p> 
          <button className="close-btn" onClick={closeDetails}>
            Close
          </button>
        </div>
      )}
    </div> 
  );
};

export default Profile; 
