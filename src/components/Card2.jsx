// Card2 -> Patii to show Project Block
import React from "react";
import "./Card2.css";
import { useNavigate } from "react-router-dom";

const Card2 = ({ projectId, projectName, projectDescription, projectSubmitDate }) => {

  const navigate = useNavigate();

  return (
    <div className="card2-container" onClick={() => navigate(`/project/${projectId}`)}>
      <div className="section1">
        <h3>{projectName}</h3>
        <p>Submission Date : {new Date(projectSubmitDate).toLocaleDateString()}</p>
      </div>
      <div className="section2">
        <p>{projectDescription}</p>
      </div>
      <div className="section3">
        <h3 className="red">Total Budget : ₹2200 </h3>
        <h3 className="green">Paid : ₹1000 </h3>
      </div>
    </div>
  );
};

export default Card2;
