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
import InventoryCompCart from "./InventoryCompCart";
import { MdShoppingCartCheckout } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";

const Inventory = () => {
  const { state } = useContext(UserContext);
  const [components, setComponents] = useState<Component_details_int[]>([]);
  const [searchFilter, setSearchFilter] = useState<Component_details_int[]>([]);
  const [selectedCompo, setSelectedCompo] = useState<Record<string, {}>>({});
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

  // callback for selected component
  const onSelectAtViewCard = (data: {}) => {
    setSelectedCompo((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    // get all components
    getAllComponent();
  }, []);

  console.log("selected compo is:-", selectedCompo);
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
      {true && (
        <div className="h-auto w-full text-center  flex flex-wrap gap-2 justify-center  items-center mt-8 mb-4">
          {/* search input  */}
          <div className=" w-[70%] flex justify-center items-center  text-slate-300">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full p-2  rounded-md outline-none text-slate-700"
              onChange={onSearchChange}
            />
          </div>

          {/* inventory cart */}
          {location.pathname !== "/inventory" && (
            <div className="w-fit text-2xl p-2 text-slate-900 text-center bg-slate-300 rounded-full relative">
              <MdShoppingCartCheckout />
              {/* cart count */}
              <div className="absolute -top-3 -right-3 text-sm rounded-full bg-red-700 text-slate-100 px-2 py-1 flex justify-center font-mono items-center">
                {Object.keys(selectedCompo).length}
              </div>
            </div>
          )}
        </div>
      )}
      {/* inventory card */}
      <div className="w-full flex flex-wrap justify-evenly ">
        {components.map((val) => {
          if (!val.isAllowedToSelect && state.role !== "admin") {
            return;
          }
          return (
            <InventoryViewCard
              key={val._id}
              compDetails={val}
              onSelect={onSelectAtViewCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
