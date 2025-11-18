import React, { useContext, useEffect, useState } from "react";
import "./PartModel.css";
import { Context } from "../main";
import Loader from "./Loader";
import { ImCross } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";

const PartModel = ({
  showPP,
  setShowPP,
  isEdit = false,
  existingData = {},
  onEditSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [link, setLink] = useState("");
  const { loading, setLoading } = useContext(Context);

  useEffect(() => {
    if (isEdit) {
      setTitle(existingData.title || "");
      setRate(existingData.rate || "");
      setLink(existingData.link || "");
    }
  }, [isEdit, existingData]); 

  const handleSubmit = async (e) => {
    e.preventDefault();     
    if(!title || !rate || !link) {
      return toast.error("Please fill in all fields");
    }
    setLoading(true);

    try {
      if(isEdit){
        //EDIT API
        const res = await axios.put(
          `${server}/part/${existingData._id}`,
          {title, rate, link},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          });
        
        toast.success("Part Updated Successfully!");
        onEditSuccess && onEditSuccess(res.data.updatedPart || res.data.part);
        // onEditSuccess(res.data.part);
      }else{
        //ADD API        
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
        });
        console.log(res);
        toast.success(res.data.message);
        onEditSuccess && onEditSuccess(res.data.part);
        // onEditSuccess(res.data.part);
      }

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="partModel-overlay">
        <div className="partModel-container">
          <form onSubmit={handleSubmit}>
            <div className="heading">
              {isEdit ? <h3>Edit the Part</h3> : <h3>Create part</h3>}
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

            <button>{isEdit ? "Update Part" : "Create Part"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PartModel;
