import React from "react";
import logo from "../assets/PartTrack.png";
import "./LoginHeader.css";

const LoginHeader = () => {
  return (
    <div className="loginHeader-container">
      <img src={logo} alt="Logo" />
      <h2>Project Component Tracker</h2>
      <p>Track and manage your hardware project components</p>
    </div>
  );
};

export default LoginHeader;
