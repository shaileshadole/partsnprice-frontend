import React, { useContext, useState } from "react";
import "./PartModel.css";
import { Context } from "../main";
import Loader from "./Loader";
import { ImCross } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";

const PartModel = ({ showPP, setShowPP }) => {
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [link, setLink] = useState("");
  const { loading, setLoading } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${server}/part/new`,
        {
          title,
          link,
          rate: parseFloat(rate),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setShowPP(false);
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
    <>
      {loading ? <Loader /> : null}
      <div className="partModel-overlay">
        <div className="partModel-container">
          <form onSubmit={handleSubmit}>
            <div className="heading">
              <h3>Create a Part</h3>
              <ImCross className="icon" onClick={() => setShowPP(false)} />
            </div>

            <hr />

            <div className="input-wrapper">
              <label htmlFor="partname">Part Name</label>
              <input
                type="text"
                id="partname"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Part Name"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="partlink">Image link</label>
              <input
                type="text"
                id="partlink"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter the Link here"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="partrate">Rate</label>
              <input
                type="number"
                id="partrate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter the rate here"
              />
            </div>

            <button>Create Part</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PartModel;
