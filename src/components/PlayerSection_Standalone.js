import React, { useState, useEffect } from "react";
import "./PlayerSection_Standalone.css";

function PlayerSection({ players }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    if (players.length > 0) {
      setSelectedPlayer(players[0]); // Auto-select the first player on load
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
              className={`player-item ${selectedPlayer?.id === player.id ? "active" : ""}`}
              onMouseEnter={() => handlePlayerHover(player)}
            >
              {player.name}
            </div>
          ))}
        </div>

        {/* Right Side - Player Details Pane */}
        <div className="player-details fade-in">
          {selectedPlayer ? (
            <>
              <img
                src={selectedPlayer.image}
                alt={selectedPlayer.name}
                className="player-image"
                onError={(e) => (e.target.style.display = "none")} // Hide broken images
              />
              <h2>{selectedPlayer.name || "Unknown Player"}</h2>
              <p>{selectedPlayer.details || "No details available."}</p>
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
