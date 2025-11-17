import React, { useContext, useEffect } from "react";
import { Button, Typography, Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import toast, { Toaster } from "react-hot-toast";
import PartsPage from "./pages/ProjectDetails";
import GlobalPart from "./pages/GlobalPart";
import { Context } from "./main";
import axios from "axios";
import { server } from "./main";

function App() {
  const { setUser, isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/user/meprofile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {

      setUser({});
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project/:projectId" element={<PartsPage />} />
          <Route path="/parts" element={<GlobalPart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

