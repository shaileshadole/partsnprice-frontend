import React, { useContext, useState, useEffect } from "react";
import "./ProjectModel.css";
import { ImCross } from "react-icons/im";
import { Context } from "../main";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import Loader from "./Loader";

const ProjectModel = ({
  showCP,
  setShowCP,
  fetchProject,
  existingData = {},
  isEdit,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [submitDate, setSubmitDate] = useState("");
  const { loading, setLoading } = useContext(Context);

  useEffect(() => {
    if(isEdit){
      setProjectName(existingData.name || "");
      setProjectDescription(existingData.description || "");

      const formattedDate = existingData.submitDate
      ? existingData.submitDate.split("T")[0]
      : "";

    setSubmitDate(formattedDate);
    console.log("This is existing Data : ");
    console.log(existingData);
    // setSubmitDate(existingData.submitDate || "");
    }
  }, [isEdit, existingData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(projectName == ""){
      return toast.error("Please write Project Name Atleast");
    }
    setLoading(true);

    try {
      // const res = await axios.post(
      //   `${server}/project/new`,
      //   {
      //     name: projectName,
      //     description: projectDescription,
      //     submitDate: submitDate ? new Date(submitDate) : undefined,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     withCredentials: true,
      //   }
      // );

      // toast.success(res.data.message);
      // fetchProject();
      // setShowCP(false);

      if(isEdit) {
        //EDIT API
        const res = await axios.put(`${server}/project/${existingData.projectId}`,{
          name: projectName,
          description: projectDescription,
          submitDate: submitDate ? new Date(submitDate) : null,
        },{
          withCredentials: true
        })
        toast.success(res.data.message);
      }else{
        //ADD API
        const res = await axios.post(`${server}/project/new`, {
          name: projectName,
          description: projectDescription,
          submitDate: submitDate
        }, {
          withCredentials: true
        }); 
        toast.success(res.data.message);
      }

      //This does not refresh the list project
      //But it refresh the whole given project
      fetchProject();
      setShowCP(false);
    } catch (error) {
      console.log("This is the error");
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to create new Project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="projectModel-overlay">
        <div className="projectModel-container">
          <form onSubmit={handleSubmit}>
            <div className="heading">
              <h3>{ isEdit ? "Edit the project" : "Create a project"}</h3>
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
            <button>{ isEdit? "Update Project" : "Create Project"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectModel;
