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
    const messagesEndRef = useRef(null);

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
            setMessages((prev) => [...prev, newMessage]);

            await axios.post(`${MESSAGE_API}/messages`, newMessage, {
                headers: { Authorization: `Bearer ${token}` },
            });

            socket.emit("sendMessage", newMessage);
            fetchMessages();
            setMessage("");
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
    const buttonStyle = {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
  };
  
  const logoutButtonStyle = { ...buttonStyle, backgroundColor: "red", marginBottom: "10px" };
  const chatContainerStyle = {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      textAlign: "center",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
  };
  const messagesContainerStyle = {
      height: "300px",
      overflowY: "scroll",
      border: "1px solid gray",
      padding: "10px",
      backgroundColor: "#fff"
  };
  const inputContainerStyle = { display: "flex", marginTop: "10px" };
  const inputStyle = {
      flex: "1",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc"
  };
  const sendButtonStyle = {
      padding: "8px 15px",
      marginLeft: "5px",
      borderRadius: "4px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer"
  };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUsername("");
        socket.disconnect();
    };

    if (!isAuthenticated) {
        return (
            <div className="auth-container">
                <h3 className="auth-title">{isLogin ? "Login" : "Signup"}</h3>
                {!isLogin && (
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="auth-input"
                    />
                )}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="auth-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="auth-input"
                />
                <button onClick={handleAuth} className="auth-button">
                    {isLogin ? "Login" : "Signup"}
                </button>
                <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
                    {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
                </p>
            </div>
        );
    }

    return (
      <div style={chatContainerStyle}>
          <h2>🟢 Group Chat</h2>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
          <div style={messagesContainerStyle}>
              {messages.map((msg, idx) => (
                  <p key={idx} style={{ 
                      textAlign: msg.username === username ? "right" : "left", 
                      backgroundColor: msg.username === username ? "#dcf8c6" : "#fff", 
                      padding: "8px", 
                      borderRadius: "5px", 
                      margin: "5px 0" 
                  }}>
                      <strong>{msg.username}:</strong> {msg.message}
                  </p>
              ))}
              <div ref={messagesEndRef}></div>
          </div>
          <div style={inputContainerStyle}>
              <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={inputStyle}
              />
              <button onClick={handleSendMessage} style={sendButtonStyle}>Send</button>
          </div>
      </div>
  );
};

export default Chat;
