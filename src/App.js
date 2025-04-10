import React from "react";
import { BrowserRouter as Router, Routes, Route,  Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main"; // Now contains Home2, Profile, and Gallery
import Awards from "./components/Awards";
import Chat from "./components/Chat";
import Teams from "./components/Series"
import Profile_Page from "./components/Profile_Page";
import LoginRegister from "./components/LoginRegister";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("username");
    setIsAuthenticated(!!sessionUser);
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} /> {/* Home2, Profile, Gallery */}
        <Route path="/teams" element={<Teams />} />
        <Route path="/profile_page" element={<Profile_Page />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/chat" element={isAuthenticated ? <Chat /> : <LoginRegister />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
