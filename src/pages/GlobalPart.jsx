import React, { useContext, useEffect, useState } from "react";
import "./GlobalPart.css";
import Header from "../components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import PartModel from "../components/PartModel";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import Card3 from "../components/Card3";

const GlobalPart = () => {
  const [partsArray, setPartsArray] = useState([]);
  const [showPP, setShowPP] = useState(false);
  const { loading, setLoading, isAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const fetchPart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/part/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setPartsArray(res.data.parts || []);
      console.log(res);
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
      setPartsArray([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPart();
  }, []);

  return (
    <>
      {showPP ? <PartModel 
        showPP={showPP} 
        setShowPP={setShowPP}
        onEditSuccess={(newPart) => {
          setPartsArray(prev => [newPart, ...prev]);
        }}
        /> : null}
      <div className="global-container">
        <Header />
        <hr />
        <div className="diva">
          <div className="gcsection1">
            <div>
              <button onClick={() => navigate("/")}>
                <IoMdArrowRoundBack className="icon" />
                <h4> Back to Home </h4>
              </button>
            </div>
            <div>
              <h3>Global Parts</h3>
              <p>List All Your Global Parts Here</p>
            </div>
          </div>

          <div className="section2">
            <CiSearch className="input-icon-right" />
            <input placeholder="Search Parts..." />
          </div>

          <div className="section3">
            <h4>Components</h4>
            <button onClick={() => setShowPP(true)}>+ Add Part</button>
          </div>

          {partsArray.length == 0 ? (
            <div className="diva2">
              <div className="section4">
                <div onClick={() => setShowPP(true)}>
                  <span>+</span>
                </div>
                <h3>No Parts Added Yet</h3>
                <p>Start building your project by adding components</p>
                <button onClick={() => setShowPP(true)}>Add First Part</button>
              </div>
            </div>
          ) : (
            <div className="section3a">
              <ul>
                {partsArray.map((part) => (
                  <li key={part._id}>
                    <Card3
                      partId={part._id}
                      partTitle={part.title}
                      partLink={part.link}
                      partRate={part.rate}
                      onDeleteSuccess={(id) => {
                        setPartsArray((prev) =>
                          prev.filter((p) => p._id !== id)
                        );
                      }}
                      onEditSuccess={(updatedPart) => {
                        setPartsArray(prev => prev.map(
                          p => p._id === updatedPart._id ? updatedPart : p
                        ));
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Show "No Parts" section only when array is empty */}
          {/* {partsArray.length === 0 && !loading && (
            <div className="diva2">
              <div className="section4">
                <div onClick={() => setShowPP(true)}>
                  <span>+</span>
                </div>
                <h3>No Parts Added Yet</h3>
                <p>Start building your project by adding components</p>
                <button onClick={() => setShowPP(true)}>Add First Part</button>
              </div>
            </div>
          )} */}

          {/* Show parts list when array has items */}
          {/* {partsArray.length > 0 && (
            <div className="section3a">
              <ul>
                {partsArray.map((part) => (
                  <li key={part._id}>
                    <Card3
                      partTitle={part.title}
                      partLink={part.link}
                      partRate={part.rate}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/* <div className="section3a">
            <ul>
              {partsArray.map((part) => {
                <li key={part._id}>
                  <Card3
                    partTitle={partTitle}
                    partLink={partLink}
                    partRate={partRate}
                  />
                </li>;
              })}
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default GlobalPart;
