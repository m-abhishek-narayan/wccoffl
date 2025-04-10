import React, { useRef, useState, useEffect } from "react";
import "./Profile.css";
import players from "./players";

const Profile = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isUserInteracting = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const scrollSpeed = 1.2; // Adjust scroll speed

  const startAutoScroll = () => {
    if (animationRef.current || selectedPlayer) return;

    const scroll = () => {
      if (scrollRef.current && !isUserInteracting.current) {
        const container = scrollRef.current;
        container.scrollLeft += scrollSpeed;

        const half = container.scrollWidth / 2;
        if (container.scrollLeft >= half) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  useEffect(() => {
    if (!selectedPlayer && !isUserInteracting.current) {
      startAutoScroll();
    }
  }, [selectedPlayer]);

  const handlePlayerClick = (player) => {
    if (selectedPlayer?.id === player.id) {
      closeDetails();
      startAutoScroll();
    } else {
      setSelectedPlayer(player);
      stopAutoScroll();
    }
  };

  const closeDetails = () => {
    setSelectedPlayer(null);
    isUserInteracting.current = false;
  };

  const handleInteractionStart = () => {
    isUserInteracting.current = true;
    stopAutoScroll();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleInteractionEnd = () => {
    if (!selectedPlayer) {
      resumeTimeoutRef.current = setTimeout(() => {
        isUserInteracting.current = false;
        startAutoScroll();
      }, 3000);
    }
  };

  const repeatedPlayers = [...players, ...players];

  return (
    <div className="profile-container">
      <h2>Player Profiles</h2>
      <div
        className="player-scroll-wrapper"
        ref={scrollRef}
        onTouchStart={handleInteractionStart}
        onTouchMove={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onScroll={() => {
          const scroll = scrollRef.current;
          const half = scroll.scrollWidth / 2;
          if (scroll.scrollLeft >= half) {
            scroll.scrollLeft = 0;
          }
        }}
      >
        <div className="player-scroll-container">
          {repeatedPlayers.map((player, index) => (
            <img
              key={index}
              src={player.image}
              alt={player.name}
              className={`player-photo ${
                selectedPlayer?.id === player.id ? "active" : ""
              }`}
              onClick={() => handlePlayerClick(player)}
              draggable={false}
            />
          ))}
        </div>
      </div>

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
