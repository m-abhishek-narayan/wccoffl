import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeamCard.css";

const API_BASE_URL = "https://wccbackend.onrender.com";

const TeamCard = ({
  teamId,
  name,
  captain,
  points,
  score,
  coreTeam,
  prevSeries,
  onUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedCaptain, setEditedCaptain] = useState(captain);
  const [editedCoreTeam, setEditedCoreTeam] = useState(coreTeam.join(", "));

  const [errorMessage, setErrorMessage] = useState("");

  // Reset form values when entering edit mode
  useEffect(() => {
    if (editMode) {
      setEditedName(name);
      setEditedCaptain(captain);
      setEditedCoreTeam(coreTeam.join(", "));
    }
  }, [editMode, name, captain, coreTeam]);

  const validateInputs = () => {
    if (!editedName.trim()) {
      setErrorMessage("Team Name cannot be empty!");
      return false;
    }
    if (!editedCaptain.trim()) {
      setErrorMessage("Captain Name cannot be empty!");
      return false;
    }
    if (!editedCoreTeam.trim()) {
      setErrorMessage("Core Team cannot be empty!");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) {
      return; // Stop saving if validation fails
    }

    try {
      await axios.post(`${API_BASE_URL}/api/team`, {
        teamId,
        teamName: editedName,
        captain: editedCaptain,
        coreTeam:
          editedCoreTeam.trim() !== ""
            ? editedCoreTeam.split(",").map((member) => member.trim())
            : coreTeam,
      });

      onUpdate(); // Refresh after update
      setEditMode(false);
    } catch (error) {
      console.error("Error updating team:", error);
      setErrorMessage("Failed to update team. Please try again.");
    }
  };

  return (
    <div className="team-card">
      {editMode ? (
        <div className="edit-mode">
          <label>Team Name</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <label>Captain</label>
          <input
            type="text"
            value={editedCaptain}
            onChange={(e) => setEditedCaptain(e.target.value)}
          />
          <label>Core Team (comma-separated)</label>
          <textarea
            value={editedCoreTeam}
            onChange={(e) => setEditedCoreTeam(e.target.value)}
          />
          {/* Error Message Display */}
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSave}>
              💾 Save
            </button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>
            {name || "N/A"}{" "}
            <span
              className="edit-icon"
              onClick={() => setEditMode(true)}
              title="Edit Team Info"
            >
              ⚡️
            </span>
          </h2>
          <p>
            <strong>Captain:</strong> {captain || "N/A"}
          </p>
          <p>
            <strong>Points:</strong> {points || 0}
          </p>
          <div className="score">
            {(score || []).slice(-4).map((result, index) => (
              <span
                key={index}
                className={`result ${
                  result === "W" ? "win" : result === "L" ? "loss" : "neutral"
                }`}
              >
                {result}
              </span>
            ))}
          </div>
          <h4>Core Team</h4>
          <ul>
            {coreTeam.length > 0
              ? coreTeam.map((member, index) => <li key={index}>{member}</li>)
              : "N/A"}
          </ul>
        </>
      )}
    </div>
  );
};

export default TeamCard;
