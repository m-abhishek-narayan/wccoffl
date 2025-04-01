import React, { useState, useEffect } from "react";
import axios from "axios";

const Home2 = () => {
    const [teams, setTeams] = useState({
        team1: { teamId: "team1", teamName: "" ,points: 0, score: [] },
        team2: { teamId: "team2", teamName: "",points: 0, score: [] }
    });
    const [activeForm, setActiveForm] = useState(null);
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showWinButtons, setShowWinButtons] = useState(false);
    const [lastWinner, setLastWinner] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [winner, setWinner] = useState(null);
    const [awardData, setAwardData] = useState({
            img: "/img/kava-award.png",
            winner: "John Doe",
            date: "2025-03-30",
            position: "1st",
            team: "Team Alpha",
        });
    const API_BASE_URL = "https://wccbackend.onrender.com";
    const PICTURE_API = "https://wccbackend.onrender.com/api";
    const [latestEntry, setLatestEntry] = useState(null);

    useEffect(() => {
        fetchTeams();
        fetchData();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/teams`);
            setTeams(response.data || {
                team1: { teamId: "team1", teamName: "", points: 0, score: [] },
                team2: { teamId: "team2", teamName: "", points: 0, score: [] }
            });
            setErrorMessage("");
        } catch (error) {
            const errorMsg = error.response?.data?.error.errorMessage || "An unexpected error occurred";
            setErrorMessage(errorMsg);
            setTimeout(() => setErrorMessage(""), 2000);
        }
    };

    if (!teams) return <h1 style={{ color: 'black' }}>Loading teams...</h1>;

    const handleShowForm = (teamId) => {
        setFormData({
            ...teams[teamId],
            coreTeam: teams[teamId].coreTeam.join(", ")
        });
        setActiveForm(teamId);
    };




    const fetchData = async () => {
        try {
            const response = await axios.get(`${PICTURE_API}/image/get-image`);
            if (response.data.image) {
                setAwardData({
                    img: response.data.image,
                    ...response.data.history?.[0],
                });
                setLatestEntry(response.data.history?.[0] || null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-5" style={{ color: 'black' }}>
            <h1 className="text-2xl font-bold">Cricket Team Management</h1>
            {successMessage && (
                <div style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                {errorMessage}
            </div>
            )}

             {/* Display Data */}
             <div style={{ display: "flex", gap: "20px" }}>
                {["team1", "team2"].map(teamId => (
                    <div key={teamId} style={{ border: "1px solid black", padding: "20px", width: "300px" }}>
                        <h2>{teamId.toUpperCase()}</h2>
                        <p><strong>Team Name:</strong> {teams[teamId].teamName || "--"}</p>
                        <p><strong>Points:</strong> {teams[teamId]?.points || 0}</p>
                        <h3 className="mt-3 font-semibold">Last Scores</h3>
                        <div className="flex gap-2">
                            {teams[teamId]?.score?.slice(-3).map((score, index) => (
                                <span key={index} className="border p-2">{score}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="award-section">
                    {/* Award Image */}
                    <div className="award-content">
                        <img
                            src={awardData.img || "/img/kava-award.png"}
                            alt="Kava Award"
                            className="award-img"
                        />
                        <h2 className="sub-title">🎉 Kava Award of the Week</h2>
                    </div>

                    {/* Award Details */}
                    <div className="award-details">
                        {latestEntry ? (
                            <>
                                <p>
                                    <strong>Winner:</strong> {latestEntry.winner}
                                </p>
                                <p>
                                    <strong>Date:</strong> {latestEntry.date}
                                </p>
                                <p>
                                    <strong>Team:</strong> {latestEntry.team}
                                </p>
                            </>
                        ) : (
                            <p>No recent award data available.</p>
                        )}
                    </div>
                </div>
        </div>
    );
};

export default Home2;