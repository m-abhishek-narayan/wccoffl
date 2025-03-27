import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getMessages, sendMessage } from "./api";

const socket = io("https://wccbackend.onrender.com");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getMessages().then(setMessages);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "" || username.trim() === "") return;
    
    const newMessage = { username, message };
    await sendMessage(username, message);
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div>
      <h2>🟢 Group Chat</h2>
      <input
        type="text"
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid gray" }}>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.username}:</strong> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
