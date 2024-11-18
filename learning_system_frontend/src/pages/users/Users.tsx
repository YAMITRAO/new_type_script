import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import userImg from "../../assets/user_avatar.jpg";
import { SingelUser } from "./types";
import axiosInst from "../../api/AxiosInst";
import { ApiResponse } from "../../api/ApiResponses";
import axios from "axios";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState<SingelUser[]>([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      dob: "20-10-2001",
    },
  ]);

  const fectchAllUsers = async () => {
    try {
      //  fetch all users api
      const response = await axiosInst.get<ApiResponse<SingelUser[]>>(
        "/user/get-all-users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("resp", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fectchAllUsers();
  }, []);

  console.log("Users are :- ", users);
  return (
    <div className="mt-6 mb-2 mx-2 flex gap-4 flex-wrap justify-center">
      {users.map((val) => {
        return (
          <UserCard
            key={val._id}
            _id={val._id}
            name={val.name}
            dob={val.dob}
            email={val.email}
            imgUrl={userImg}
          />
        );
      })}
    </div>
  );
};

export default Users;
