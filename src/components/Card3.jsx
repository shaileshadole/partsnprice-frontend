import React, { useContext } from "react";
import "./Card3.css";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Context } from "../main";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const Card3 = ({ partId, partTitle, partLink, partRate, onDeleteSuccess }) => {
  const { setLoading } = useContext(Context);

  const handleClick = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this part?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await axios.delete(`${server}/part/${partId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast.success("Deleted Successfully!");
      onDeleteSuccess(partId);
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
    setLoading(false);
  };

  return (
    <div className="card3-container">
      <div className="section1">
        <img src={partLink} alt="partTitle" />
      </div>
      <div className="ccsection2">
        <h3>{partTitle}</h3>
        <div className="ccsection4">
          <FiEdit className="editicon" />
          <MdDelete onClick={handleClick} className="deleteicon" />
        </div>
      </div>
      <div className="ccsection3">
        <div>
          <h3 className="red">Rate: </h3>
        </div>
        <div>
          <h3 className="red">₹{partRate} </h3>
        </div>
      </div>
    </div>
  );
};

export default Card3;
