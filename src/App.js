import React, { useEffect, useState } from "react";
import Home from "./components/HomePage"
import Profile from "./components/Profile";
import Gallery from "./components/Gallery";
import Awards from "./components/Awards";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import KavaHistory from "./components/KavaHistory";

const App = () => {
    return (
        <>
            <Navbar />
            <div id="home"><Home /></div>
            <div id="profile"><Profile /></div>
            <div id="gallery"><Gallery /></div>
            <div id="awards"><Awards /></div>
            <Chat />
            <div id="kavaHistory"><KavaHistory /></div>
            <Footer />
        </>
    );
};

export default App;
