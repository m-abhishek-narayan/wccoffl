import React from "react";
import "./HomePage.css";

const CustomAlert = ({ message, type, onClose, persistent }) => {
  return (
    <div className={`alert-box ${type === "error" ? "error" : ""}`}>
      {message}
      {persistent && (
        <button onClick={onClose} style={{ marginLeft: "15px" }}>
          OK
        </button>
      )}
    </div>
  );
};

export default CustomAlert;
