function Home() {
  return (
    <header>
      <video src="public/video.mp4" loop autoPlay muted></video>
      <h1>Open Source Website</h1>
      <div className="row">
        <button className="btn" style={{ cursor: "pointer" }}>
          Sign Up
        </button>

        <button className="btn" style={{ cursor: "pointer" }}>
          Log in
        </button>
      </div>

      <div className="headerbg"></div>
    </header>
  );
}
export default Home;
