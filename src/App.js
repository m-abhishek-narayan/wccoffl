import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main"; // Now contains Home2, Profile, and Gallery
import Awards from "./components/Awards";
import Chat from "./components/Chat";
import Teams from "./components/HomePage"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} /> {/* Home2, Profile, Gallery */}
        <Route path="/teams" element={<Teams />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
