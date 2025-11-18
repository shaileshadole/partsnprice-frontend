// Card4 -> Patti to show Part Block in Project details
import React, { useContext } from "react";
import "./Card4.css";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Context } from "../main";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const Card4 = ({
  projectId,
  partId,
  partTitle,
  partLink,
  partRate,
  quantity,
  fetchSpecificProject
}) => {
  const { setLoading } = useContext(Context);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this part?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await axios.delete(`${server}/project/${projectId}/part/${partId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast.success(res.data.message);
      fetchSpecificProject();
      // onDeleteSuccess(partId);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete part of Project");
    }
    setLoading(false);
  };

  //Increament by One
  const incrementByOne = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${server}/project/${projectId}/part/${partId}/plusone`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);  
      fetchSpecificProject();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to Increase by One"
      );
    } finally {
      setLoading(false);
    }
  };

  //Decrement by One
  const decrementByOne = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${server}/project/${projectId}/part/${partId}/minusone`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data.message);
      fetchSpecificProject();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to Decrease by One"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card4-container">
      <div className="section1">
        <img src={partLink} alt="partTitle" />
      </div>
      <div className="ccsection2">
        <h3>{partTitle}</h3>
        <div className="ccsection4">
          {/* <FiEdit className="editicon" /> */}
          <button onClick={decrementByOne}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementByOne}>+</button>
          <MdDelete onClick={handleDelete} className="deleteicon" />
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

      <div className="ccsection3">
        <div>
          <h3 className="green">Total: </h3>
        </div>
        <div>
          <h3 className="green">₹{partRate * quantity} </h3>
        </div>
      </div>
    </div>
  );
};

export default Card4;
