import React, { useState } from "react";
import "./TeamCard.css";

const TeamCard = ({ name, captain, points, results, coreTeam, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedCaptain, setEditedCaptain] = useState(captain);
  const [editedCoreTeam, setEditedCoreTeam] = useState(coreTeam.join(", "));

  const handleSave = () => {
    const updatedTeam = {
      name: editedName || name, // Use editedName
      captain: editedCaptain || captain, // Use editedCaptain
      points: points,
      results: results,
      coreTeam:
        editedCoreTeam.trim() !== ""
          ? editedCoreTeam.split(",").map((member) => member.trim())
          : coreTeam, // Use editedCoreTeam
    };
  
    if (onUpdate) {
      onUpdate(updatedTeam);
    }
    setEditMode(false); // Corrected from setIsEditing to setEditMode
  };
  
  

  return (
    <div className="team-card">
      {editMode ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedCaptain}
            onChange={(e) => setEditedCaptain(e.target.value)}
          />
          <textarea
            value={editedCoreTeam}
            onChange={(e) => setEditedCoreTeam(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
          <h2>
            {name}{" "}
            <span
              className="edit-icon"
              onClick={() => setEditMode(true)}
              title="Edit Team Info"
            >
              ⚡️
            </span>
          </h2>
          <p>
            <strong>Captain:</strong> {captain}
          </p>
          <p>
            <strong>Points:</strong> {points}
          </p>
          <div className="results">
            {results.map((result, index) => (
              <span
                key={index}
                className={`result ${result === "W" ? "win" : "loss"}`}
              >
                {result}
              </span>
            ))}
          </div>
          <h4>Core Team</h4>
          <ul>
            {coreTeam.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TeamCard;
