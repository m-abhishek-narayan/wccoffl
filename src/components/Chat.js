import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "./chat.css";

const MESSAGE_API = "https://wccbackend.onrender.com/api";
const socket = io(MESSAGE_API, { autoConnect: false });

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const messagesContainerRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [username, setUsername] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("username");
        if (!sessionUser) {
            navigate("/login");
            return;
        }
        setUsername(sessionUser);
        setIsAuthenticated(true);
        fetchMessages();
        socket.connect();
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("receiveMessage");
            socket.disconnect();
        };
    }, [navigate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleScroll = () => {
        const bottom = messagesContainerRef.current.scrollHeight === messagesContainerRef.current.scrollTop + messagesContainerRef.current.clientHeight;
        setIsAtBottom(bottom);
    };

    const scrollToBottom = () => {
        if (isAtBottom && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const fetchMessages = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const { data } = await axios.get(`${MESSAGE_API}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(data);
        } catch (err) {
            console.error("Error fetching messages", err);
        }
    };

    const handleSendMessage = async () => {
        if (message.trim() === "") return;

        try {
            const token = sessionStorage.getItem("token");
            const newMessage = { username, message };
            setMessage("");
            setMessages((prev) => [...prev, newMessage]);
            await axios.post(`${MESSAGE_API}/messages`, newMessage, {
                headers: { Authorization: `Bearer ${token}` },
            });

            socket.emit("sendMessage", newMessage);
        } catch (err) {
            console.error("Error sending message", err);
        }
    };

    return (
        <div className="chat-wrapper">
            <h2>🟢 Discussion Forum</h2>
            <div className="chat-container">
                <p>Welcome, {username}!</p>
                <div ref={messagesContainerRef} className="messages-container" onScroll={handleScroll}>
                    {messages.map((msg, idx) => (
                        <p key={idx} className={`message ${msg.username === username ? "sent" : "received"}`}>
                            <strong>{msg.username}:</strong> {msg.message}
                        </p>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="message-input"
                    />
                    <button onClick={handleSendMessage} className="send-button">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;