import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ViewUserDetailsCard from "./ViewUserDetailsCard";
import axiosInst from "../../../api/AxiosInst";
import { projectDetails, SingelUser, userDashboard } from "./types";
import { ApiResponse } from "../../../api/ApiResponses";

const ViewUser = () => {
  const { userId } = useParams();

  const [userDetails] = useState<SingelUser>({
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    dob: "20-10-2001",
    userClass: "none",
    userSec: "none",
    isBlocked: false,
  });

  const [userProjects] = useState<projectDetails>({
    _id: "",
    projectTitle: "",
    projectDescription: "",
    teamName: "",
    teamMembers: "",
    owner: "",
  });

  const getUserDetails = async () => {
    try {
       await axiosInst.get<ApiResponse<userDashboard>>(
        `/user/single-user-all-details/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log("Response is", response);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  console.log("User Detail s", userDetails);
  console.log("Users project details", userProjects);
  return (
    <div>
      {/* top section */}
      <div>
        <ViewUserDetailsCard />
      </div>
    </div>
  );
};

export default ViewUser;
