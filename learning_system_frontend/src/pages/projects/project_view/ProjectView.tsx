import { useContext, useEffect, useState } from "react";
import PreviousDetailsCard from "./PreviousDetailsCard";
import axiosInst from "../../../api/AxiosInst";
import { ApiResponse } from "../../../api/ApiResponses";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ProjectInvitationCard from "./ProjectInvitationCard";
// import UserContext from "../../../context/user_context/UserContext";
import CartCard from "./CartCard";

export interface projectDetails_int {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  approvalStatus: string;
  isEditAllowed: boolean;
  isComponentSelectionAllowed: boolean;
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
    requirementAddFromInventory?: {};
  };
  projectResources?: {};
  projectInvitations: {
    _id: string;
    invitedUsers: {}; // objects of invited users
  };
}

const ProjectView = () => {
  // const { state } = useContext(UserContext);
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
      console.log("!!!!!!!!!!!Propject data(response) is :-", response);
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
          onSuccess={() => getSingleProjectData()}
        />
      </div>

      {/* right side */}
      <div className="w-full flex flex-col gap-4 items-center ">
        {/* invitation card */}
        {projectDetails && projectDetails.approvalStatus === "success" && (
          <ProjectInvitationCard
            projectId={(projectDetails && projectDetails._id) || "none"}
            email={projectDetails?.createdBy?.email || "none"}
            invitedUsers={projectDetails?.projectInvitations.invitedUsers || {}}
            invitationDocId={projectDetails?.projectInvitations._id}
            onSuccess={() => getSingleProjectData()}
          />
        )}

        {/* select component card */}
        {projectDetails && projectDetails.approvalStatus == "success" && (
          <CartCard
            projectId={projectDetails._id}
            isComponentSelectionAllowed={
              projectDetails.isComponentSelectionAllowed
            }
            selectedComponentsFromInventory={
              projectDetails.projectRequirement?.requirementAddFromInventory
            }
            onSuccess={() => getSingleProjectData()}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectView;
