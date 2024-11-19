import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import userImg from "../../assets/user_avatar.jpg";
import { SingelUser } from "./types";
import axiosInst from "../../api/AxiosInst";
import { ApiResponse } from "../../api/ApiResponses";
import axios from "axios";
import { toast } from "react-toastify";
import UserSearch from "./UserSearch";

const Users = () => {
  const [users, setUsers] = useState<SingelUser[]>([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      dob: "20-10-2001",
      userClass: "none",
      userSec: "none",
      isBlocked: false,
    },
  ]);

  const [searchInput, setSearchInput] = useState<string>("");

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
    <div className="w-full h-auto">
      {/* user serach bar */}
      <UserSearch onSearch={(data) => setSearchInput(data)} />

      <div className="mt-6 mb-2 mx-2 flex gap-4 flex-wrap justify-center">
        {/* users list */}
        {users
          .filter((val) => {
            return (
              val.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
              val.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
              val.dob?.includes(searchInput.toLowerCase()) ||
              val.userClass
                ?.toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              val.userSec?.toLowerCase().includes(searchInput.toLowerCase())
            );
          })
          .map((val) => {
            return (
              <UserCard
                key={val._id}
                _id={val._id}
                name={val.name}
                dob={val.dob}
                email={val.email}
                userClass={val.userClass ? val.userClass : "none"}
                userSec={val.userSec ? val.userSec : "none"}
                isBlocked={val.isBlocked}
                imgUrl={userImg}
                callBack={() => fectchAllUsers()}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Users;
