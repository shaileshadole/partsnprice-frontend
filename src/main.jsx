import React from "react";
import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { server1 } from "./Context/config.js";

// export const server = "http://localhost:4000/api/v1";
// export const server = "https://partsnprice-backend.onrender.com/api/v1";
export const server = server1;


export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={
        {isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser}
      }
    >
      <App />
    </Context.Provider>
  );
};

// ReactDom.createRoot(
//   document.getElementById("root").render(
//     <React.StrictMode>
//       <AppWrapper />
//     </React.StrictMode>
//   )
// );

const rootElement = document.getElementById("root");

// Prevent double root creation during HMR
if (!rootElement._reactRootContainer) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
}
