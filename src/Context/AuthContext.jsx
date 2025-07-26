import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Stores user info
  const [loading, setLoading] = useState(true); // For global loading state

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${server}/user/meprofile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  useEffect(() => {
    fetchUser(); // Automatically run on page load
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
