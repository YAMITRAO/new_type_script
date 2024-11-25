import { useEffect, useState } from "react";
import PreviousDetailsCard from "./PreviousDetailsCard";
import axiosInst from "../../../api/AxiosInst";
import { ApiResponse } from "../../../api/ApiResponses";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Invitationcard from "./Invitationcard";

export interface projectDetails_int {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  approvalStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: {
    name: string;
    email: string;
    userClass?: string;
    userSec?: string;
  };
  projectRequirement?: {
    requirementOnCreation: {};
  };
}

const ProjectView = () => {
  const params = useParams();
  const projectId = params.projectId;

  const [projectDetails, setProjectDeatils] = useState<projectDetails_int>();

  // get single project details from API
  const getSingleProjectData = async () => {
    try {
      const response = await axiosInst.get<ApiResponse<projectDetails_int>>(
        `/user/get-single-project/${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log("Propject data is :-", response);
      setProjectDeatils(response?.data?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
  };
  // console.log("Project Data ", projectDetails);
  useEffect(() => {
    getSingleProjectData();
  }, []);
  return (
    <div className=" flex flex-col lg:flex-row ">
      {/* left side */}
      <div className="w-full">
        {/* project details and related buttons  */}
        <PreviousDetailsCard
          projectData={projectDetails}
          onSuccess={getSingleProjectData}
        />
      </div>

      {/* right side */}
      <div className="w-full flex justify-center ">
        {/* invitation card */}
        <Invitationcard />
      </div>
    </div>
  );
};

export default ProjectView;
