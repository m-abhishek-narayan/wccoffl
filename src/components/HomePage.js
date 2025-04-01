import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamCard from "./TeamCard";
import CustomAlert from "./CustomAlert";
import "./HomePage.css"; // Ensure your HomePage.css has the updated CSS

const API_BASE_URL = "https://wccbackend.onrender.com";

const HomePage = () => {
  const [teamA, setTeamA] = useState({
    teamId: "team1",
    name: "Team A",
    captain: "Unknown",
    points: 0,
    results: [],
    coreTeam: [],
    prevSeries: [],
  });

  const [teamB, setTeamB] = useState({
    teamId: "team2",
    name: "Team B",
    captain: "Unknown",
    points: 0,
    results: [],
    coreTeam: [],
    prevSeries: [],
  });

  const [showWinButtons, setShowWinButtons] = useState(false);
  const [lastWinner, setLastWinner] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seriesHistory, setSeriesHistory] = useState([]);

  // Alert and Modal States
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    persistent: false,
  });

  const [pendingAction, setPendingAction] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // States for modal, passcode, and success animation
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  const correctPasscode = "1234"; // Set your passcode here

  // Handle passcode submission
  const handlePasscodeSubmit = () => {
    if (passcode === correctPasscode) {
      setPasscodeSuccess(true);
      setTimeout(() => {
        setShowPasscodeModal(false);
        setPasscode("");
        setPasscodeSuccess(false);
        showAlert("✅ Passcode Verified!", "success");
        executeAction(confirmAction); // Execute pending action
      }, 1000);
    } else {
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 500);
      showAlert(" Incorrect Passcode", "error");
    }
  };

  // Confirmation modal response
  const handleConfirmResponse = (confirmed) => {
    if (confirmed) {
      setShowPasscodeModal(true);
    } else {
      showAlert("❌ Action Cancelled", "error");
    }
    setShowConfirmModal(false);
  };

  // Show alert helper
  const showAlert = (message, type = "success", persistent = false) => {
    setAlert({ message, type, persistent });
    if (!persistent) {
      setTimeout(
        () => setAlert({ message: "", type: "", persistent: false }),
        2000
      );
    }
  };

  useEffect(() => {
    fetchAllSeriesHistory();
    fetchTeams();
  }, []);

  const fetchAllSeriesHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/team/series-history`);
      const fetchedHistory = response.data.seriesHistory || [];

      // Make sure the series data has teamA and teamB properly assigned
      const formattedHistory = fetchedHistory.map((series) => ({
        ...series,
        teamA: series.teams?.teamA || "Unknown Team A",
        teamB: series.teams?.teamB || "Unknown Team B",
      }));

      setSeriesHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching series history:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/teams`);
      const { team1, team2 } = response.data || {};
      
      setTeamA({ ...teamA, ...team1 });
      setTeamB({ ...teamB, ...team2 });
      showAlert("Teams updated!");
    } catch (error) {
      console.error("Error fetching teams:", error);
      showAlert("Error fetching teams.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleWin = async (team) => {
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/api/team/update-points`, { winnerId: team === "A" ? "team1" : "team2" });
      setLastWinner(team === "A" ? "team1" : "team2");
      fetchTeams();
      showAlert(`Team ${team} wins!`);
    } catch (error) {
      console.error("Error updating points:", error);
      showAlert("Error updating points.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetLatestScore = async () => {
    if (!lastWinner) return;
  
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/api/team/revert`, {
        lastWinnerId: lastWinner,
      });
  
      if (response.status === 200) {
        setLastWinner(null);
        fetchTeams();
        showAlert("Last result reverted successfully!");
      } else {
        showAlert("Error reverting latest result.", "error");
      }
    } catch (error) {
      console.error("Error reverting score:", error);
      showAlert("Error reverting latest result.", "error");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEndSeries = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/team/end-series`);
  
      if (response.status === 200) {
        const { winningTeam } = response.data; // Get winning team details
  
        setWinner({
          captain: winningTeam?.captain || "No winner",
          team: winningTeam?.teamName || "Draw",
        });
  
        showAlert(
          `Series Ended! Winning Team: ${winningTeam?.teamName || "Draw"}, Captain: ${winningTeam?.captain || "None"}`
        );
  
        fetchTeams();
        fetchAllSeriesHistory();
      } else {
        showAlert("Error ending series.", "error");
      }
    } catch (error) {
      console.error("Error ending series:", error);
      showAlert("Error ending series.", "error");
    } finally {
      setLoading(false);
    }
  };
  

  // Open Confirmation Modal
  const openConfirmModal = (action) => {
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  // Execute confirmed action after passcode success
  const executeAction = async (action) => {
    switch (action) {
      case "updatePointsA":
        handleWin("A");
        break;
      case "updatePointsB":
        handleWin("B");
        break;
      case "revert":
        handleResetLatestScore();
        break;
      case "endSeries":
        handleEndSeries();
        break;
      default:
        showAlert("❌ Invalid Action", "error");
        break;
    }
  };

  return (
    <div className="homepage">
      {alert.message && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "", persistent: false })}
          persistent={alert.persistent}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="modal-content">
            <h2>⚡️ Confirm Your Choice</h2>
            <p>Are you ready to execute this action? Think twice!</p>
            <div className="modal-buttons">
              <button onClick={() => handleConfirmResponse(true)}>
                ✅ Proceed
              </button>
              <button onClick={() => handleConfirmResponse(false)}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Passcode Modal */}
      {showPasscodeModal && (
        <div className="passcode-modal">
          <div className={`modal-content ${passcodeError ? "shake" : ""}`}>
            {passcodeSuccess ? (
              <div className="success-check"></div>
            ) : (
              <>
                <h2>🔐 Enter Passcode</h2>
                <p>Security is tight! Please enter the passcode to continue.</p>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode"
                />
                <div className="modal-buttons">
                  <button onClick={handlePasscodeSubmit}>✅ Verify</button>
                  <button onClick={() => setShowPasscodeModal(false)}>
                    ❌ Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="team-container">
        <TeamCard {...teamA} onUpdate={fetchTeams} />
        <div className="center-controls">
          {!showWinButtons ? (
            <button
              className="update-score-btn"
              onClick={() => setShowWinButtons(true)}
              disabled={loading}
            >
              Update Score
            </button>
          ) : (
            <div className="win-btns-container">
              <button
                className="match-btn win-btn"
                onClick={() => openConfirmModal("updatePointsA")}
                disabled={loading}
              >
                Team A Wins
              </button>
              <button
                className="match-btn loss-btn"
                onClick={() => openConfirmModal("updatePointsB")}
                disabled={loading}
              >
                Team B Wins
              </button>
              <div
                className="cancel-cross"
                onClick={() => setShowWinButtons(false)}
              >
                ❌
              </div>
            </div>
          )}

          {!showWinButtons && (
            <>
              <button
                className="reset-btn"
                onClick={() => openConfirmModal("revert")}
                disabled={!lastWinner || loading}
              >
                Revert Last Result
              </button>
              <button
                className="end-btn"
                onClick={() => openConfirmModal("endSeries")}
                disabled={loading}
              >
                End-Series
              </button>
            </>
          )}
        </div>
        <TeamCard {...teamB} onUpdate={fetchTeams} />
      </div>
      {loading && <p>Loading series history...</p>}

      <div className="match-coverage">
        {seriesHistory.length === 0 ? (
          <p>No series history found.</p>
        ) : (
          seriesHistory.map((series, index) => (
            <div key={index} className="match-entry">
              <h3>
                {series.teamA} 🆚 {series.teamB}
              </h3>
              <p>Captain: {series?.captain?.teamA || "Unknown"} 🆚 {series?.captain?.teamB || "Unknown"}</p>
              <p>Points: {series?.points?.teamA || 0} 🆚 {series?.points?.teamB || 0}</p>
              <p>
                <strong>🏆 Winner:</strong>{" "}
                {series.points.teamA > series.points.teamB ? series.teamA : series.teamB}
              </p>
              <p>
                <strong>📅 Period:</strong>{" "}
                {new Date(series.startDate).toLocaleDateString()} -{" "}
                {new Date(series.endDate).toLocaleDateString()}
              </p>
              <p>
              <strong>📊 Score:</strong> {series?.score?.teamA?.slice(-4).join(", ") || "No Data"} 🆚 {series?.score?.teamB?.slice(-4).join(", ") || "No Data"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;