import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./chat.css";

const API_URL = "https://wccbackend.onrender.com/api/auth";

const LoginRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            axios.get(`${API_URL}/user`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                sessionStorage.setItem("username", response.data.username);
                sessionStorage.setItem("admin", response.data.admin);
                setIsAuthenticated(true);
                navigate("/");
            }).catch(() => {
                sessionStorage.clear();
                setIsAuthenticated(false);
            });
        }
    }, [navigate]);

    const handleAuth = async () => {
        if (!email || !password || (!isLogin && !username)) return;

        try {
            const endpoint = isLogin ? "/login" : "/register";
            const body = isLogin ? { email, password } : { username, email, password };
            const { data } = await axios.post(`${API_URL}${endpoint}`, body);

            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("username", data.user.username);
            sessionStorage.setItem("admin", data.user.admin);
            setIsAuthenticated(true);
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error("Authentication error", err);
            alert("Authentication failed");
        }
    };

    return (
        <div className="auth-wrapper">
            <h1 className="text-3xl font-bold text-center mb-6">Login Page</h1>
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
                <button onClick={handleAuth} className="auth-button">{isLogin ? "Login" : "Signup"}</button>
                <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
                    {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default LoginRegister;