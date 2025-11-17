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
import Footer from "../components/Footer";
import Loader from "../components/Loader";
// import { useAuth } from "../Context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `${server}/user/login`,
        {
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
      // console.log(res.data);

      // setUser(res.data.user);

      // setEmail("");
      // setPassword("");

      navigate("/");
    } catch (error) {
      setIsAuthenticated(true);
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
          <h3>Welcome Back</h3>
          <p>Sign in to your account to continue</p>

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

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}> Sign up</span>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
