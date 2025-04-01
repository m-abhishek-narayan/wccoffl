import React, { useState, useEffect } from "react";
import "./PlayerSection_Standalone.css";

function PlayerSection({ players }) {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);

  useEffect(() => {
    if (players.length > 0) {
      setSelectedPlayer(players[0]); // Auto-select first player on load
    }
  }, [players]);

  // Handle Player Hover
  const handlePlayerHover = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="player-section">
      <div className="player-container">
        {/* Left Side - Player Names with Hover Effect */}
        <div className="player-list">
          {players.map((player) => (
            <div
              key={player.id}
              className={`player-item ${
                selectedPlayer?.id === player.id ? "active" : ""
              }`}
              onMouseEnter={() => handlePlayerHover(player)}
            >
              {player.name}
            </div>
          ))}
        </div>

        {/* Right Side - Player Details with Smooth Animation */}
        <div className="player-details fade-in">
          {selectedPlayer ? (
            <>
              <img
                src={selectedPlayer.image}
                alt={selectedPlayer.name}
                className="player-image"
              />
              <h2>{selectedPlayer.name}</h2>
              <p>{selectedPlayer.details}</p>
            </>
          ) : (
            <p className="text-white">No player selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerSection;