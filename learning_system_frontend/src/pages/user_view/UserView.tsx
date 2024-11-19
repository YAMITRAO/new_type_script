import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInst from "../../api/AxiosInst";
import UserViewDetailCard from "./UserViewDetailCard";

const UserView = () => {
  const { userId } = useParams();

  const getUserDetails = async () => {
    try {
      const response = await axiosInst.get(
        `/user/single-user-all-details/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response is", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      {/* top section */}
      <div>
        <UserViewDetailCard />
      </div>
    </div>
  );
};

export default UserView;
