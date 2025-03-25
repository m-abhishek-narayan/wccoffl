import React from 'react';
import { useState,useEffect } from 'react';
function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message") 
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <header>
      <video src="public/video.mp4" loop autoPlay muted></video>
      <div className="row">
        <h1>{message ? message : "WCC"}</h1>
      </div>

      <div className="headerbg"></div>
    </header>
  );
}
export default Home;
