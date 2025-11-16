import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetails.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import Card1 from "../components/Card1";
import axios from "axios";
import { Context, server } from "../main";
import Card3 from "../components/Card3";
import Loader from "../components/Loader";
import AddPartPopup from "../components/AddPartPopup";
import Card4 from "../components/Card4";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [showPartModal, setShowPartModal] = useState(false);
  const [partsArray, setPartsArray] = useState([]);

  //use it to pass in Card1
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0); 

  const navigate = useNavigate();

  const { loading, setLoading } = useContext(Context);

  const calculateTotals = (parts) => {
    let quantitySum = 0;
    let costSum = 0;

    parts.forEach((entry) => {
      quantitySum += entry.quantity;
      costSum += entry.quantity * (entry.part?.rate || 0);
    });

    setTotalQuantity(quantitySum);
    setTotalCost(costSum);
  };

  const fetchSpecificProject = async () => {
    setLoading(true);
    try {
      const projectRes = await axios.get(`${server}/project/${projectId}`, {
        withCredentials: true,
      });

      setProject(projectRes.data.project);
      setPartsArray(projectRes.data.project.parts);

      //Calculate kar lavdya
      calculateTotals(projectRes.data.project.parts);

      //Logging the data
      console.log(projectRes);
      console.log(project);
      console.log(partsArray);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSpecificProject();
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <AddPartPopup
        show={showPartModal}
        setShow={setShowPartModal}
        projectId={projectId}
        onPartAdded={fetchSpecificProject}
      />

      <div className="partsPage-container">
        <Header />
        <hr />
        <div className="diva">
          <div className="section1">
            <div>
              <button onClick={() => navigate("/")}>
                <IoMdArrowRoundBack className="icon" />
                <h4> Back to project </h4>
              </button>
            </div>
            <div>
              <h3>{project ? project.name : "Loading..."}</h3>
              <p>{project ? project.description : ""}</p>
            </div>
          </div>

          <div className="section2">
            <Card1
              c1heading={"Total Parts"}
              c1Number={totalQuantity}
              c1Des={"Parts Added"}
            />
            <Card1
              c1heading={"Total Cost"}
              c1Number={totalCost}
              c1Des={"Project Budget"}
            />
            <Card1 c1heading={"Bill Paid"} c1Number={0} c1Des={"Paise Aale"} />
            <Card1
              c1heading={"Bill Remaining"}
              c1Number={totalCost - 0}
              c1Des={"Baaki Aahe"}
            />
          </div>

          <div className="section3">
            <h4>Components</h4>
            <button onClick={() => setShowPartModal(true)}>+ Add Part</button>
          </div>

          <div className="diva2">
            {partsArray.length == 0 ? (
              <div className="section4">
                <div onClick={() => setShowCP(true)}>
                  <span>+</span>
                </div>
                <h3>No Parts Added Yet</h3>
                <p>Start building your project by adding components</p>
                <button onClick={() => setShowCP(true)}>Add First Part</button>
              </div>
            ) : (
              <div className="section3a">
                <ul>
                  {partsArray.map((entry) => (
                    <li key={entry._id}>
                      <Card4
                        partTitle={entry.part.title}
                        partLink={entry.part.link}
                        partRate={entry.part.rate}
                        quantity={entry.quantity}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
