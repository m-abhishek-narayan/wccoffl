import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home2.css"; // Import CSS

const Home2 = () => {
    const [teams, setTeams] = useState({
        team1: { teamName: "CSK", points: 20, score: ["W", "L", "-", "W", "W"] },
        team2: { teamName: "MI", points: 15, score: ["L", "W", "-", "L", "L"] }
    });

    const [awardData, setAwardData] = useState({
        img: "/img/kava-award.png",
        winner: "MS Dhoni",
        date: "2025-04-01",
        team: "CSK"
    });

    const API_BASE_URL = "https://wccbackend.onrender.com";
    const PICTURE_API = "https://wccbackend.onrender.com/api";

    useEffect(() => {
        fetchTeams();
        fetchAwardData();
    }, []);
    useEffect(() => {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const homeWrapper = document.querySelector('.home2-wrapper');
        homeWrapper.style.marginTop = `${navbarHeight}px`;
      }, []);
      
    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/teams`);
            setTeams(response.data || { team1: { teamName: "CSK", points: 20, score: [] }, team2: { teamName: "MI", points: 15, score: [] } });
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    const fetchAwardData = async () => {
        try {
            const response = await axios.get(`${PICTURE_API}/image/get-image`);
            if (response.data.image) {
                setAwardData({
                    img: response.data.image,
                    ...response.data.history?.[0],
                });
            }
        } catch (error) {
            console.error("Error fetching award data:", error);
        }
    };

    // Trim score array to last 4 results
    const trimScores = (scores) => {
        return scores.slice(-4);
    };

    return (
        <div className="home2-wrapper">
            <h1 className="home2-title">Cricket Scoreboard</h1>

            {/* Scorecard */}
            <div className="home2-scorecard">
                {/* Left Section - Teams */}
                <div className="home2-teams">
                    {/* Team 1 */}
                    <div className="home2-team">
                        <div className="home2-team-header">
                            <span className="home2-team-name">{teams.team1.teamName}</span>
                            <span className="home2-team-points">{teams.team1.points}</span>
                        </div>
                        <div className="home2-score-history">
                            {trimScores(teams.team1.score).map((result, index) => (
                                <span key={index} className={result === "W" ? "win" : result === "L" ? "loss" : "neutral"}>
                                    {result}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Team 2 */}
                    <div className="home2-team">
                        <div className="home2-team-header">
                            <span className="home2-team-name">{teams.team2.teamName}</span>
                            <span className="home2-team-points">{teams.team2.points}</span>
                        </div>
                        <div className="home2-score-history">
                            {trimScores(teams.team2.score).map((result, index) => (
                                <span key={index} className={result === "W" ? "win" : result === "L" ? "loss" : "neutral"}>
                                    {result}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section - Award */}
                <div className="home2-award">
                    <p className="home2-award-title">🏆 Kava of the Week</p>
                    <img src={awardData.img} alt="Award" className="home2-award-img" />
                    <div className="home2-award-details">
                        <p><span className="home2-detail-header">Winner:</span> {awardData.winner}</p>
                        <p><span className="home2-detail-header">Date:</span> {awardData.date}</p>
                        <p><span className="home2-detail-header">Team:</span> {awardData.team}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home2;
