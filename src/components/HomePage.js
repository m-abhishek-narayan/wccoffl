import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamCard from "./TeamCard";
import CustomAlert from "./CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

const API_BASE_URL = "https://wccbackend.onrender.com";

const HomePage = () => {
  const [teamA, setTeamA] = useState({
    teamId: "team1",
    teamName: "Team A",
    captain: "Unknown",
    points: 0,
    results: [],
    coreTeam: [],
    prevSeries: [],
  });

  const [teamB, setTeamB] = useState({
    teamId: "team2",
    teamName: "Team B",
    captain: "Unknown",
    points: 0,
    results: [],
    coreTeam: [],
    prevSeries: [],
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [lastWinner, setLastWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seriesHistory, setSeriesHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showWinButtons, setShowWinButtons] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    persistent: false,
  });

  useEffect(() => {
    fetchAllSeriesHistory();
    fetchTeams();
    const adminStatus = sessionStorage.getItem("admin") === "Y";
    const userLoggedIn = sessionStorage.getItem("username") !== null;
    setIsAdmin(adminStatus);
    setIsLoggedIn(userLoggedIn);
  }, []);

  const showAlert = (message, type = "success", persistent = false) => {
    setAlert({ message, type, persistent });
    if (!persistent) {
      setTimeout(
        () => setAlert({ message: "", type: "", persistent: false }),
        2000
      );
    }
  };

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
    if (!isAdmin) return;
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
    if (!isAdmin || !lastWinner) return;

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
    if (!isAdmin) return;
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


  const toggleCollapse = () => setIsOpen(!isOpen);

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
      <div className="team-container">
        <TeamCard {...teamA} onUpdate={fetchTeams} />
        <TeamCard {...teamB} onUpdate={fetchTeams} />
      </div>
      {isAdmin && (
        <div className="admin-controls">
          {!showWinButtons ? (
            <button
              className="update-score-btn"
              onClick={() => setShowWinButtons(true)}
              disabled={loading}
            >
              Update Score
            </button>
          ) : (<div className="win-btns-container">
            <button className="match-btn win-btn" onClick={() => handleWin("A")} disabled={loading}>Team A Wins</button>
            <button className="match-btn loss-btn" onClick={() => handleWin("B")} disabled={loading}>Team B Wins</button>
            <div className="cancel-cross" onClick={() => setShowWinButtons(false)}>❌</div></div>)}
          {!showWinButtons && (
            <>
              <button className="reset-btn" onClick={handleResetLatestScore} disabled={!lastWinner || loading}>Revert Last Result</button>
              <button className="end-btn" onClick={handleEndSeries} disabled={loading}>End-Series</button>
            </>
          )}
        </div>
      )
        // : isLoggedIn ? (
        //   <p className="not-admin-message">You are signed in but do not have admin privileges.</p>
        // ) : (<button onClick={() => navigate("/login")}>Please Login as Admin to Update Score</button>)
      }
      <div className="match-coverage-container">
        {loading && <p>Loading series history...</p>}
        {seriesHistory.length === 0 ? (
          <p>No series history found.</p>
        ) : (
          <>
            <div className="past-series-container">
              <button onClick={toggleCollapse} className="collapsible-header">
                Past series Scorelines: {isOpen ? "▲" : "▼"}
              </button>

              <div className={`collapsible-content ${isOpen ? "open" : ""}`}>
                <table className="series-table">
                  <thead>
                    <tr>
                      <th>Series Name</th>
                      <th>Captains</th>
                      <th>Winning team</th>
                      <th>Date Period</th>
                      <th>The Finish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seriesHistory.map((series, index) => (
                      <tr key={index}>
                        <td>
                          <span className="team team-a">{series.teamA}</span> vs <span className="team team-b">{series.teamB}</span>
                        </td>
                        <td>
                          <span className="team team-a">{series?.captain?.teamA || "Unknown"}</span> vs <span className="team team-b">{series?.captain?.teamB || "Unknown"}</span>
                        </td>
                        <td>
                          <span className="winner">
                            {series.points.teamA > series.points.teamB ? series.teamA : series.teamB}
                          </span>
                        </td>
                        <td>
                          {new Date(series.startDate).toLocaleDateString()} - {new Date(series.endDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span className="team-score">
                            {series?.score?.teamA?.slice(-4).map((r, i) => (
                              <span key={`a-${i}`} className={`score-badge ${r.toLowerCase()}`}>{r}</span>
                            )) || "No Data"}
                          </span>
                          <span className="vs-separator">vs</span>
                          <span className="team-score">
                            {series?.score?.teamB?.slice(-4).map((r, i) => (
                              <span key={`b-${i}`} className={`score-badge ${r.toLowerCase()}`}>{r}</span>
                            )) || "No Data"}
                          </span>
                        </td>
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
