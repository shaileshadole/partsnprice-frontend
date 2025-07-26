import React, { useContext, useState } from "react";
import "./ProjectModel.css";
import { ImCross } from "react-icons/im";
import { Context } from "../main";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import Loader from "./Loader";

const ProjectModel = ({ showCP, setShowCP }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [submitDate, setSubmitDate] = useState("");

  const { loading, setLoading } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${server}/project/new`,
        {
          name: projectName,
          description: projectDescription,
          submitDate: submitDate ? new Date(submitDate) : undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setShowCP(false);
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

      <div className="projectModel-overlay">
        <div className="projectModel-container">
          <form onSubmit={handleSubmit}>
            <div className="heading">
              <h3>Create a project</h3>
              <ImCross className="icon" onClick={() => setShowCP(false)} />
            </div>
            <hr />

            <div className="input-wrapper">
              <label htmlFor="projectname">Project Name</label>
              <input
                type="text"
                id="projectname"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter Project name"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="projectdescription">Project Description</label>
              <textarea
                id="projectdescription"
                className="description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter Description (Optional)"
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="submitDate">Submit Date</label>
              <input
                type="date"
                id="submitDate"
                value={submitDate}
                onChange={(e) => setSubmitDate(e.target.value)}
              />
            </div>
            <button>Create Project</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectModel;
