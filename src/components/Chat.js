import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./chat.css";

const API_URL = "https://wccbackend.onrender.com/api/auth";
const MESSAGE_API = "https://wccbackend.onrender.com/api";
const socket = io(API_URL, { autoConnect: false });

const Chat = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const messagesContainerRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
            fetchMessages();
            socket.connect();
        }

        socket.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
            fetchMessages();
        });

        return () => {
            socket.off("receiveMessage");
            socket.disconnect();
        };
    }, []);

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

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const { data } = await axios.get(`${API_URL}/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsername(data.username);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Error fetching user", err);
            handleLogout();
        }
    };

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");
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
            const token = localStorage.getItem("token");
            const newMessage = { username, message };
            setMessage(""); // clear message input immediately
            setMessages((prev) => [...prev, newMessage]); // optimistically add message
            await axios.post(`${MESSAGE_API}/messages`, newMessage, {
                headers: { Authorization: `Bearer ${token}` },
            });

            socket.emit("sendMessage", newMessage);
        } catch (err) {
            console.error("Error sending message", err);
        }
    };

    const handleAuth = async () => {
        if (!email || !password || (!isLogin && !username)) return;

        try {
            const endpoint = isLogin ? "/login" : "/register";
            const body = isLogin ? { email, password } : { username, email, password };
            const { data } = await axios.post(`${API_URL}${endpoint}`, body);

            localStorage.setItem("token", data.token);
            setUsername(data.user.username);
            setIsAuthenticated(true);
            fetchMessages();
            socket.connect();
        } catch (err) {
            console.error("Authentication error", err);
            alert("Authentication failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUsername("");
        socket.disconnect();
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    if (!isAuthenticated) {
        return (
            <><h1 className="text-3xl font-bold text-center mb-6">Discussion Forum</h1><div className="auth-wrapper">

                <div className="auth-container">

                    <h3 className="auth-title">{isLogin ? "Login" : "Signup"}</h3>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input" />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input" />
                    <button onClick={handleAuth} className="auth-button">
                        {isLogin ? "Login" : "Signup"}
                    </button>
                    <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
                        {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
                    </p>
                </div>
            </div></>
        );
    }

    return (
        <div className="chat-wrapper">
            <h2>🟢 Discussion Forum</h2>
            <div className="chat-container">
            
                <p>Welcome, {username}!</p>
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <div
                    ref={messagesContainerRef}
                    className="messages-container"
                    onScroll={handleScroll}
                >
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
                        onKeyDown={handleKeyPress}
                        className="message-input"
                    />
                    <button onClick={handleSendMessage} className="send-button">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
