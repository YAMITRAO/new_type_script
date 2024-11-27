import { Link } from "react-router-dom";
import InventoryViewCard from "./InventoryViewCard";
import { RiFolderAddLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInst from "../../../api/AxiosInst";
import { ApiResponse } from "../../../api/ApiResponses";
import { Component_details_int } from "./types";

const Inventory = () => {
  const [components, setComponents] = useState<Component_details_int[]>([]);
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    // get all components
    getAllComponent();
  }, []);
  return (
    <div className="w-full">
      {/* add-to-inventory button */}
      <Link to="/add-to-inventory" className="flex fixed bottom-4 right-4">
        <span className="text-4xl p-1 text-slate-300 bg-[#176d83] rounded shadow-[1px_1px_3px_rgba(255,255,255,1)]">
          <RiFolderAddLine />
        </span>
      </Link>
      {/* search bar */}
      <div className="h-16 w-full text-center">Search</div>
      {/* inventory card */}
      <div className="w-full border flex flex-wrap justify-evenly ">
        {components.map((val) => {
          return <InventoryViewCard key={val._id} compDetails={val} />;
        })}
      </div>
    </div>
  );
};

export default Inventory;
