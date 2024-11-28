import { Link } from "react-router-dom";
import InventoryViewCard from "./InventoryViewCard";
import { RiFolderAddLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInst from "../../../api/AxiosInst";
import { ApiResponse } from "../../../api/ApiResponses";
import { Component_details_int } from "./types";
import UserContext from "../../../context/user_context/UserContext";

const Inventory = () => {
  const { state } = useContext(UserContext);
  const [components, setComponents] = useState<Component_details_int[]>([]);
  const [searchFilter, setSearchFilter] = useState<Component_details_int[]>([]);
  // get all component
  const getAllComponent = async () => {
    try {
      const response = await axiosInst.get<
        ApiResponse<Component_details_int[]>
      >("/inventory/get-all-compo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log("response is :- ", response);
      setComponents(response.data.data);
      setSearchFilter(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  // filter according to search
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    console.log("Search value is,", search);
    let arr = searchFilter.filter((val) => {
      return val.componentTitle.toLowerCase().includes(search);
    });
    setComponents(arr);
  };

  useEffect(() => {
    // get all components
    getAllComponent();
  }, []);
  return (
    <div className="w-full">
      {/* add-to-inventory button */}
      {state.role === "admin" && (
        <Link to="/add-to-inventory" className="flex fixed bottom-4 right-4">
          <span className="text-4xl p-1 text-slate-300 bg-[#176d83] rounded shadow-[1px_1px_3px_rgba(255,255,255,1)]">
            <RiFolderAddLine />
          </span>
        </Link>
      )}
      {/* search bar */}
      {location.pathname === "/inventory" && (
        <div className="h-auto w-full text-center  flex justify-center items-center mt-8 mb-4">
          {/* search input  */}
          <div className=" w-[70%] flex justify-center items-center  text-slate-300">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full p-2  rounded-md outline-none text-slate-700"
              onChange={onSearchChange}
            />
          </div>
        </div>
      )}
      {/* inventory card */}
      <div className="w-full flex flex-wrap justify-evenly ">
        {components.map((val) => {
          if (!val.isAllowedToSelect && state.role !== "admin") {
            return;
          }
          return <InventoryViewCard key={val._id} compDetails={val} />;
        })}
      </div>
    </div>
  );
};

export default Inventory;
