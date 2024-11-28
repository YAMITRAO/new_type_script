import axios from "axios";
import InvitationCard from "./InvitationCard";
import { toast } from "react-toastify";
import axiosInst from "../../api/AxiosInst";
import { useEffect, useState } from "react";
import { ApiResponse } from "../../api/ApiResponses";
import { Get_Invitation_API_Response_int } from "./types";

const Invitations = () => {
  const [invitations, setInvitations] = useState<
    Get_Invitation_API_Response_int[]
  >([]);

  const getInvitationHandler = async () => {
    try {
      const response = await axiosInst.get<
        ApiResponse<Get_Invitation_API_Response_int[]>
      >("/user/get-projects-invitation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("Response data is ;- ", response.data);
      setInvitations(response.data.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Internal Server error");
      }
    }
  };
  useEffect(() => {
    getInvitationHandler();
  }, []);
  return (
    <div className=" flex flex-col gap-2 justify-center mt-4">
      {invitations.length > 0 && (
        <div className="text-xl text-center text-slate-300 font-medium">
          Invitations
        </div>
      )}
      <div className="flex gap-2 justify-center mt-2">
        {invitations.map((val) => {
          return (
            <InvitationCard
              creatorName={val.createdBy.name}
              projectTitle={val.projectRefrence.projectTitle}
              invitationDocId={val._id}
              projectId={val.projectRefrence._id}
              onSuccess={() => getInvitationHandler()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Invitations;
