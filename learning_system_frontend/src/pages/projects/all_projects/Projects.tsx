import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/user_context/UserContext";
import axiosInst from "../../../api/AxiosInst";
import { ApiResponse } from "../../../api/ApiResponses";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineAddComment } from "react-icons/md";
import { Link } from "react-router-dom";
import ProjectViewCard from "./ProjectViewCard";

interface projectDetails {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  approvalStatus: string;
  createdBy: {
    name: string;
    email: string;
    userClass?: string;
    userSec?: string;
  };
}

const Projects = () => {
  const { state, dispatch } = useContext(UserContext);
  // project details state
  const [projectDetails, setProjectsDetails] = useState<projectDetails[]>([
    {
      _id: "",
      projectTitle: "Loading...",
      approvalStatus: "",
      projectDescription: "",
      createdBy: {
        name: "",
        email: "",
      },
    },
  ]);

  // get project details from backend
  const getProjectData = async () => {
    try {
      const response = await axiosInst.get<ApiResponse<projectDetails[]>>(
        "/user/get-all-projects",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Propject data is :-", response);
      let responseDataArray: projectDetails[] = [];
      response.data.data.forEach((ele) => {
        responseDataArray.push({
          _id: ele._id,
          projectTitle: ele.projectTitle,
          projectDescription: ele.projectDescription,
          approvalStatus: ele.approvalStatus,
          createdBy: ele.createdBy,
        });
      });
      setProjectsDetails(responseDataArray);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectData();
  }, []);
  console.log("Project details is:- ", projectDetails);

  return (
    <>
      {/* main page */}
      <div className="h-auto w-[100%] box-border  pb-16 ">
        {/*  button to add new project*/}
        <Link
          to="/register-project"
          className="absolute bottom-2 right-6 text-4xl text-slate-100 bg-[#3c6e71] p-2 rounded-md shadow-[2px_2px_2px_rgba(210,210,210,1)] hover:scale-110 hover:text-slate-400 hover:bg-[#3b6a6d] cursor-pointer transition-all z-50"
        >
          {/* <MdLibraryAdd /> */}
          <MdOutlineAddComment />
        </Link>

        {!state.isProjectRegistered && (
          <div className=" w-full flex flex-wrap justify-center gap-2 box-border mt-16 pt-2 ">
            {projectDetails.map((ele, index) => {
              // return <div key={index + "uniqueKety"}>{ele.projectTitle}</div>;
              return (
                <ProjectViewCard
                  _id={ele._id}
                  role={state.role}
                  key={index + "uniqueKety"}
                  projectTitle={ele.projectTitle}
                  projectDescription={ele.projectDescription}
                  approvalStatus={ele.approvalStatus}
                  userEmail={ele.createdBy.email}
                  userName={ele.createdBy.name}
                  userClass={ele.createdBy?.userClass || "test"}
                  userSec={ele.createdBy?.userSec || "T"}
                  onSuccess={() => getProjectData()}
                />
              );
            })}{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
