import React, { useContext, useState } from "react";
import LoginHeader from "./LoginHeader";
import "./Login.css";
import axios from "axios";
import { Context, server } from "../main.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";
import { useAuth } from "../Context/AuthContext.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    if (password != confirmPassword) {
      return toast.error("Password Doesn't match");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${server}/user/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setLoading(false);
      // console.log(res.data);

      // setEmail("");
      // setPassword("");
      // setName("");
      // setConfirmPassword("");

      // setUser(res.data.user);

      navigate("/");
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <LoginHeader />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h3>Create Account</h3>
          <p>Get Started With Your First Project</p>

          <label htmlFor="name">Name</label>
          <div className="input-wrapper">
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
              aria-label="name"
            />
            <FaUser className="input-icon-right" />
          </div>

          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              aria-label="Email"
            />
            <FaEnvelope className="input-icon-right" />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
              aria-label="Password"
            />
            <span
              className="input-icon-right"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-wrapper">
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Your Password"
              required
              aria-label="Password"
            />
            <span
              className="input-icon-right"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}> Sign In</span>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
