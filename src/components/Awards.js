import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Awards.css";
import CustomAlert from "./CustomAlert";
import kavaHistoryData from "./data";

const PICTURE_API = "https://wccbackend.onrender.com/api";

const Awards = () => {
    const [showForm, setShowForm] = useState(false);
    const [awardData, setAwardData] = useState({
        img: "/img/kava-award.png",
        winner: "John Doe",
        date: "2025-03-30",
        position: "1st",
        team: "Team Alpha",
    });

    const [newData, setNewData] = useState({
        img: "",
        winner: "",
        date: "",
        position: "",
        team: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [history, setHistory] = useState([]);
    const [latestEntry, setLatestEntry] = useState(null);
    const [isTableVisible, setIsTableVisible] = useState(true); // To manage visibility of the table

    // Fetch image and latest entry from backend
    const fetchData = async () => {
        try {
            const response = await axios.get(`${PICTURE_API}/image/get-image`);
            if (response.data.image) {
                setAwardData({
                    img: response.data.image,
                    ...response.data.history?.[0],
                });
                setHistory(response.data.history || []);
                setLatestEntry(response.data.history?.[0] || null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("Error fetching data. Try again later.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Show/Hide the form
    const toggleForm = () => {
        setShowForm(!showForm);
    };


    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    // Handle file upload and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setNewData({ ...newData, img: imageUrl });
            setImageFile(file);
        }
    };

    // Upload and update award with backend API
    const updateAward = async (e) => {
        e.preventDefault();

        if (
            !newData.winner ||
            !newData.date ||
            !newData.position ||
            !newData.team ||
            !imageFile
        ) {
            setMessage("Please fill all fields before updating!");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("winner", newData.winner);
        formData.append("date", newData.date);
        formData.append("position", newData.position);
        formData.append("team", newData.team);

        try {
            await axios.post(`${PICTURE_API}/image/upload`, formData);
            setSuccessMessage("Award updated successfully!");
            setShowForm(false);
            fetchData(); // Fetch latest data after upload
        } catch (error) {
            setMessage("Error uploading data. Please try again.");
        }

        // Clear form after update
        setNewData({
            img: "",
            winner: "",
            date: "",
            position: "",
            team: "",
        });
        setImagePreview(null);
    };

    // Clear messages after a timeout
    useEffect(() => {
        if (message || successMessage) {
            const timer = setTimeout(() => {
                setMessage("");
                setSuccessMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, successMessage]);

    return (
        <>
            {/* Main Title */}
            <div className="title-container">
                <h1 className="text-3xl font-bold text-center mb-6">🏆 Kava Awards</h1>
            </div>

            {/* Award Section */}
            <div className="award-container">
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
                                    <strong>Position:</strong> {latestEntry.position}
                                </p>
                                <p>
                                    <strong>Team:</strong> {latestEntry.team}
                                </p>
                            </>
                        ) : (
                            <p>No recent award data available.</p>
                        )}
                        <button className="update-btn" onClick={toggleForm}>
                            Update Kava of the Week
                        </button>
                    </div>
                </div>

                {/* Form as a Pop-up Modal */}
                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3 className="form-title">📝 Update Kava Award</h3>
                            <form onSubmit={updateAward} className="update-form">
                                <input
                                    type="file"
                                    name="img"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="form-control mb-3"
                                    required
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="image-preview"
                                    />
                                )}
                                <input
                                    type="text"
                                    name="winner"
                                    placeholder="Enter winner name"
                                    value={newData.winner}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={newData.date}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />
                                <input
                                    type="text"
                                    name="position"
                                    placeholder="Enter position"
                                    value={newData.position}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />
                                <input
                                    type="text"
                                    name="team"
                                    placeholder="Enter team name"
                                    value={newData.team}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />
                                <button type="submit" className="update-btn">
                                    Update Award
                                </button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={toggleForm}
                                >
                                    Cancel Update
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Current Section */}
            <div className="history-section">
                <h3>📚 Kava Awards Current Series</h3>

                {/* Toggle Table Button */}
                <button
                    className="toggle-table-btn"
                    onClick={() => {
                        setIsTableVisible(!isTableVisible);
                        console.log("Is Table Visible:", !isTableVisible); // 👈 Add this line here
                    }}
                >
                    {isTableVisible ? "Hide Awards History" : "Show Awards History"}
                </button>


                {/* Conditionally Render Table */}
                {isTableVisible && (
                    <div className={`table-container ${!isTableVisible ? "hidden" : ""}`}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Winner</th>
                                    <th>Date</th>
                                    <th>Position</th>
                                    <th>Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length > 0 ? (
                                    history.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.winner}</td>
                                            <td>{item.date}</td>
                                            <td>{item.position}</td>
                                            <td>{item.team}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center" }}>
                                            No records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Success/Error Messages using CustomAlert */}
            {message && (
                <CustomAlert
                    message={message}
                    type="error"
                    onClose={() => setMessage("")}
                    persistent={true}
                />
            )}
            {successMessage && (
                <CustomAlert
                    message={successMessage}
                    type="success"
                    onClose={() => setSuccessMessage("")}
                    persistent={true}
                />
            )}
            {/* History of Kava Winners (2017-2024) with Images */}
            <div className="kava-history-section">
                <h3>🏅 History of Kava Awards (2017-2024)</h3>
                <div className="history-container">
                    {kavaHistoryData.map((item, index) => (
                        <div key={index} className="history-card">
                            <img src={item.img} alt={item.winner} className="player-img" />
                            <div className="history-info">
                                <p>
                                    <strong>{item.year}</strong>
                                </p>
                                <p>{item.winner}</p>
                                <p>
                                    Matches: {item.matches} | Kavas: {item.kavas} | Win %: {item.percent}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Awards;
