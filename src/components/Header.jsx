import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/logoCircle.png";
import "./Header.css";
import { FiUser } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { Context, server } from "../main";
import axios from "axios";
import Model1 from "./Model1";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { isAuthenticated, setIsAuthenticate, user, setUser } = useContext(Context);


  const navigate = useNavigate();


  return (
    <>
      {showLogout ? <Model1 setShowLogout={setShowLogout} /> : null}

      <div className="header-container">
        <div className="header-container-div1">
          <img src={logo} alt="Logo" />
          <h3>PartsNPrice</h3>
        </div>
        <div className="header-container-div2">
          <p>
          <FiUser /> {isAuthenticated && user?.name ? user.name : "No User"}
            {/* <FiUser /> {user ? user.name : "No User"} */}
            {/* {userName || "No User"}  */}
          </p>

          {/* Login Logout button conditional rendering */}
          {isAuthenticated  ? (
            <button onClick={() => setShowLogout(true)}>
              <MdLogout className="logout-icon" /> <span>Logout</span>
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>
              <CgLogIn  className="logout-icon" /> <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
