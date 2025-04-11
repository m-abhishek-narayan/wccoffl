const isLocal = window.location.hostname === "localhost";

export const MESSAGE_API = isLocal
  ? "http://localhost:8080/api"
  : "https://wccbackend.onrender.com/api";

export const SOCKET_URL = isLocal
  ? "http://localhost:8080"
  : "https://wccbackend.onrender.com";