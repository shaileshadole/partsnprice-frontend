import React, { useContext, useState } from "react";
import Header from "../components/Header";
import "./Home.css";
import { CiSearch } from "react-icons/ci";
import ProjectModel from "../components/ProjectModel";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context, server } from "../main";
import Card2 from "../components/Card2";
import Loader from "../components/Loader";
import PartModel from "../components/PartModel";

const Home = () => {
  const [projectArray, setProjectArray] = useState([]);
  const [showCP, setShowCP] = useState(false);
  const [showPP, setShowPP] = useState(false);
  const navigate = useNavigate();

  const { loading, setLoading, isAuthenticated } = useContext(Context);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/project/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setProjectArray(res.data.projects);
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

  useEffect(() => {
    fetchProject();
  }, [isAuthenticated]);

  return (
    <>
      {loading ? <Loader /> : null}
      {showCP ? (
        <ProjectModel
          showCP={showCP}
          setShowCP={setShowCP}
          fetchProject={fetchProject}
        />
      ) : null}
      {showPP ? <PartModel showPP={showPP} setShowPP={setShowPP} /> : null}
      <div className="home-container">
        <Header />
        <hr />
        <div className="section1">
          <div className="div1">
            <h2>My Projects</h2>
            <p>Manage your hardware projects and components</p>
          </div>
          <div className="div2">
            <button onClick={() => navigate("/parts")}>+ New Component</button>
            <button onClick={() => setShowCP(true)}>+ New Project</button>
          </div>
        </div>
        <div className="section2">
          <CiSearch className="input-icon-right" />
          <input placeholder="Search Projects..." />
        </div>
        <div className="diva">
          {projectArray.length == 0 ? (
            <div className="section3">
              <div onClick={() => setShowCP(true)}>
                <span>+</span>
              </div>
              <h3>No Projects Yet</h3>
              <p>Create your first project to start tracking components</p>
              <button onClick={() => setShowCP(true)}>
                Create First Project
              </button>
            </div>
          ) : (
            <div className="section3a">
              <ul>
                {projectArray.map((project) => (
                  <li key={project._id}>
                    <Card2
                      projectId={project._id}
                      projectName={project.name}
                      projectDescription={project.description}
                      projectSubmitDate={project.submitDate}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
