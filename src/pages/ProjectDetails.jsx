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
import toast from "react-hot-toast";
import ProjectModel from "../components/ProjectModel";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [showPartModal, setShowPartModal] = useState(false);
  const [ showEditProjectModel, setShowEditProjectModel ] = useState(false);
  const [partsArray, setPartsArray] = useState([]);

  //use it to pass in Card1
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0); 

  const navigate = useNavigate();

  const { loading, setLoading } = useContext(Context);

  //Calculating for Card1
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

  //Fetching the project
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

  //Deleting the project
  const deleteProject = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Project?"
    );
    if (!confirmDelete) return;

    try{
      setLoading(true);

      const res= await axios.delete(`${server}/project/${projectId}`, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      navigate("/");
    }catch(error){
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete project!");
    }finally{
      setLoading(false);
    }
  }

  // //Updating the project
  // const updateProject = async () => {
  //   try{
  //     setLoading(true);

  //     const res = await axios.put(`${server}/project/${projectId}`)

  //   }catch(error){
  //     console.log(error);
  //     toast.error(error?.response?.data?.message || "Failed to update project!");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  //Updating the project
  const updateProject = () => {
    setShowEditProjectModel(true);
  }



  return (
    <>
      {loading ? <Loader /> : null}
      <AddPartPopup
        show={showPartModal}
        setShow={setShowPartModal}
        projectId={projectId}
        onPartAdded={fetchSpecificProject}
      />

      {showEditProjectModel ? (
        <ProjectModel
          showCP={showEditProjectModel}
          setShowCP={setShowEditProjectModel}
          fetchProject={fetchSpecificProject}
          existingData={{
            projectId: project._id,
            name: project.name,
            description: project.description,
            submitDate: project.submitDate,
          }}
          isEdit={true}
        />
      ) : null}

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
            <div className="section1b">
              <h3>{project ? project.name : "Loading..."}</h3>
              <p>{project ? project.description : ""}</p>
            </div>
            <div className="section1c">
              <button onClick={() => setShowEditProjectModel(true)}>Update Project</button>
              <button className="del" onClick={(deleteProject)}>Delete Project</button>
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
                <div onClick={() => setShowPartModal(true)}>
                  <span>+</span>
                </div>
                <h3>No Parts Added Yet</h3>
                <p>Start building your project by adding components</p>
                <button onClick={() => setShowPartModal(true)}>Add First Part</button>
              </div>
            ) : (
              <div className="section3a">
                <ul>
                  {partsArray.map((entry) => (
                    <li key={entry._id}>
                      <Card4
                        partId={entry.part._id}
                        projectId={projectId}
                        partTitle={entry.part.title}
                        partLink={entry.part.link}
                        partRate={entry.part.rate}
                        quantity={entry.quantity}
                        fetchSpecificProject={fetchSpecificProject}
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
