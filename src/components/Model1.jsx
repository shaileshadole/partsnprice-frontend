import React, { useContext } from "react";
import "./Model1.css";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";
import axios from "axios";
import { Context, server } from "../main";

const Model1 = ({ setShowLogout }) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      setShowLogout(false);
      setIsAuthenticated(false);
      setUser({});
    } catch (error) {
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
    }
  };

  return (
    <div className="model1-container">
      <div className="model1-container2">
        <div className="section1">
          <h3>Are you sure?</h3>
          <ImCross onClick={() => setShowLogout(false)} className="icon" />
        </div>
        <div className="section2">
          <button onClick={handleLogout}>YES</button>
          <button className="red" onClick={() => setShowLogout(false)}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model1;
