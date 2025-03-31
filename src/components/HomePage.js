import React, { useState } from "react";
import TeamCard from "./TeamCard";
import "./HomePage.css";

const HomePage = () => {
  const [teamA, setTeamA] = useState({
    name: "Team A",
    captain: "John Doe",
    points: 0,
    results: [],
    coreTeam: ["Alice", "Bob", "Charlie"],
  });

  const [teamB, setTeamB] = useState({
    name: "Team B",
    captain: "Jane Smith",
    points: 0,
    results: [],
    coreTeam: ["David", "Eve", "Frank"],
  });

  const [showWinButtons, setShowWinButtons] = useState(false);

  // Win/lose handler
  const handleWin = (team) => {
    if (team === "A") {
      setTeamA({
        ...teamA,
        points: teamA.points + 1,
        results: ["W", ...teamA.results],
      });
      setTeamB({
        ...teamB,
        results: ["L", ...teamB.results],
      });
    } else {
      setTeamB({
        ...teamB,
        points: teamB.points + 1,
        results: ["W", ...teamB.results],
      });
      setTeamA({
        ...teamA,
        results: ["L", ...teamA.results],
      });
    }
    // Hide buttons after updating score
    setShowWinButtons(false);
  };

  // Reset latest score
  const handleResetLatestScore = () => {
    setTeamA({
      ...teamA,
      results: teamA.results.slice(1),
      points: teamA.results[0] === "W" ? teamA.points - 1 : teamA.points,
    });

    setTeamB({
      ...teamB,
      results: teamB.results.slice(1),
      points: teamB.results[0] === "W" ? teamB.points - 1 : teamB.points,
    });
  };

  return (
    <div className="homepage">
      <div className="team-container">
        {/* Team A Card */}
        <TeamCard
          {...teamA}
          onUpdate={(updatedTeam) => setTeamA(updatedTeam)}
        />
{/* Centered Match Controls */}
<div className="center-controls">
  {!showWinButtons ? (
    <button
      className="update-score-btn"
      onClick={() => setShowWinButtons(true)}
    >
      Update Score
    </button>
  ) : (
    <div className="win-btns-container">
      <button
        className="match-btn win-btn"
        onClick={() => handleWin("A")}
      >
        Team A Wins
      </button>
      <button
        className="match-btn loss-btn"
        onClick={() => handleWin("B")}
      >
        Team B Wins
      </button>
      {/* Cross Icon to Cancel */}
      <div className="cancel-cross" onClick={() => setShowWinButtons(false)}>
        cancel
      </div>
    </div>
  )}
</div>


        {/* Team B Card */}
        <TeamCard
          {...teamB}
          onUpdate={(updatedTeam) => setTeamB(updatedTeam)}
        />
      </div>
    </div>
  );
};

export default HomePage;
