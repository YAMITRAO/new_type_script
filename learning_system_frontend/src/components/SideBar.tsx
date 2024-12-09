import { useContext, useState } from "react";
import UserContext from "../context/user_context/UserContext";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { FaGifts } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PiCertificate } from "react-icons/pi";

import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
// import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import { PiMicrosoftTeamsLogoDuotone } from "react-icons/pi";

import { RiUserLine } from "react-icons/ri";
import { AiOutlineAlert } from "react-icons/ai";
// import { AiOutlineBarChart } from "react-icons/ai";

// import { IoSearch } from "react-icons/io5";
// import { IoDocumentTextSharp } from "react-icons/io5";
// import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
// import NavBar from "./NavBar";

const SideBar = () => {
  const [isDarkVisible, setIsDarkVisible] = useState(false);
  // context data
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    // dispatch({ type: "LOGOUT-USER" });
    dispatch({ type: "LOGOUT_USER" });
    navigate("/login");
  };
  return (
    <div
      className=" h-[calc(100vh-56px)] box-border w-fit shadow-[0px_1px_3px_rgba(250,250,250,0.9)]"
      // onMouseEnter={() => setIsDarkVisible(true)}
      // onMouseLeave={() =>
      //   setTimeout(() => {
      //     setIsDarkVisible(false);
      //   }, 100)
      // }
    >
      {/* side bar expended -dark */}
      {isDarkVisible && (
        <div className="flex flex-col items-center w-40 h-full overflow-x-hidden text-gray-400 bg-[#1f1f1f] rounded overflow-y-auto custom-scrollbar-sidebar">
          {/* profile  */}
          <div className=" flex items-center  text-slate-300   w-full px-5 py-2 mt-3 relative">
            <Link
              to="/"
              className="flex  items-center  hover:text-green-700 transition-all"
            >
              {state.role === "admin" ? (
                <span className="text-2xl mr-2">
                  <RiUserSettingsLine />
                </span>
              ) : (
                <span className="text-2xl mr-2">
                  <RiUserLine />
                </span>
              )}
              <span className="text-md font-medium capitalize">
                {state.role}
              </span>
            </Link>

            <span
              className="text-3xl absolute right-1 bg-[#003049]  rounded-full text-slate-200 cursor-pointer hover:text-green-700 hover:bg-white transition-all"
              onClick={() => setIsDarkVisible((prev) => !prev)}
            >
              <FaArrowAltCircleLeft />
            </span>
          </div>

          <div className="w-full px-2">
            {/* extended bar :- top part (dashboard) */}
            <div className="flex flex-col items-center gap-1 w-full mt-3 py-2 border-t border-gray-700">
              {/* dashboard */}
              <NavLink
                to="/"
                className="flex items-center w-full h-fit p-1 px-3  rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className="ml-2 text-sm font-medium">Dasboard</span>
              </NavLink>
              {/* users (only admin)*/}
              {state.role === "admin" && (
                <NavLink
                  to="/users"
                  className="flex items-center w-full h-fit py-1 px-3  rounded hover:bg-gray-700 hover:text-gray-300"
                >
                  <span className="text-2xl">
                    <FaUsers />
                  </span>
                  <span className="ml-2 text-sm font-medium">Users</span>
                </NavLink>
              )}
              {/* teams (both users) */}
              <NavLink
                to="/invitations"
                className="flex items-center w-full h-fit p-1 px-3  rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  {" "}
                  <PiMicrosoftTeamsLogoDuotone />
                </span>
                <span className="ml-2 text-sm font-medium">Invitations</span>
              </NavLink>
              {/* projects (both user) */}
              <NavLink
                to="/projects"
                className="flex items-center w-full h-fit p-1 px-3  rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <AiOutlineAlert />
                </span>
                <span className="ml-2 text-sm font-medium">Projects</span>
              </NavLink>
            </div>

            {/* extended bar :- middle part (settings) */}
            <div className="flex flex-col items-center gap-1 py-2 w-full mt-2 border-t border-gray-700">
              {/* Inventory (both usres) */}
              <NavLink
                to="/inventory"
                className="flex items-center w-full h-fit p-1 px-3  rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <MdOutlineInventory2 />
                </span>
                <span className="ml-2 text-sm font-medium">Inventory</span>
              </NavLink>

              {/* Requirements (admin only) */}
              {state.role === "admin" && (
                <NavLink
                  to="/requirements"
                  className="flex items-center w-full h-fit p-1 px-3  rounded hover:bg-gray-700 hover:text-gray-300"
                >
                  <span className="text-2xl">
                    <FaBasketShopping />
                  </span>
                  <span className="ml-2 text-sm font-medium">Requirements</span>
                </NavLink>
              )}

              {/* expenses (admin only) */}
              {state.role === "admin" && (
                <NavLink
                  to="/expenses"
                  className="flex items-center w-full h-fit p-1 px-3  rounded hover:bg-gray-700 hover:text-gray-300"
                >
                  <span className="text-2xl">
                    <FaWallet />
                  </span>
                  <span className="ml-2 text-sm font-medium">Expenses</span>
                </NavLink>
              )}

              {/* Allocations (both the users) */}
              <NavLink
                to="/allocations"
                className="flex items-center w-full h-fit p-1 px-3 rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <FaGifts />
                </span>
                <span className="ml-2 text-sm font-medium">Allocations</span>
                <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
              </NavLink>
            </div>

            {/* extended bar :- bottom part (settings) */}
            <div className="flex flex-col items-center py-2 gap-1 w-full mt-2 border-t border-gray-700">
              {/* certificates (both the usre) */}
              <NavLink
                to="/certificates"
                className="flex items-center w-full h-fit p-1 px-3 rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <PiCertificate />
                </span>
                <span className="ml-2 text-sm font-medium">Certificates</span>
              </NavLink>

              {/* message (both the usre) */}
              <NavLink
                to="/messages"
                className="flex items-center w-full h-fit p-1 px-3 rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <MdOutlineMessage />
                </span>
                <span className="ml-2 text-sm font-medium">Messages</span>
              </NavLink>

              {/*settings  (only admin)*/}
              {state.role === "admin" && (
                <NavLink
                  to="/settings"
                  className="flex items-center w-full h-fit p-1 px-3 rounded hover:bg-gray-700 hover:text-gray-300"
                >
                  <span className="text-2xl">
                    <IoSettingsOutline />
                  </span>
                  <span className="ml-2 text-sm font-medium">Settings</span>
                </NavLink>
              )}
            </div>
          </div>

          {/* Extended bar:- logout  */}
          <Link
            to="/login"
            className="flex gap-2 items-center justify-center w-full h-16 mt-auto shadow-[0px_-1px_2px_rgba(200,200,200,0.7)] hover:bg-red-900 hover:text-white text-red-600 p-2"
            onClick={logoutHandler}
          >
            <span className="text-3xl">
              {" "}
              <AiOutlineLogout />
            </span>
            <span className=" text-lg font-medium">Logout</span>
          </Link>
        </div>
      )}

      {/* side bar shrik dark */}
      {!isDarkVisible && (
        <div className="flex flex-col items-center w-20 h-full overflow-hidden text-gray-400 bg-[#1f1f1f] rounded overflow-y-auto custom-scrollbar-sidebar">
          <div
            className="flex items-center justify-center mt-3 pb-3  w-full h-fit border-b border-gray-700"
            onClick={() => setIsDarkVisible((prev) => !prev)}
          >
            <span className="text-4xl bg-[#003049]  rounded-full text-slate-200 hover:bg-white hover:text-green-700 cursor-pointer transition-all">
              <FaArrowAltCircleRight />
            </span>
          </div>

          <div className="w-full  h-full flex flex-col   ">
            {/* Collapsed Bar:- top after profile part (dashboard ) */}
            <div className="flex flex-col items-center gap-2 py-2  ">
              {/* dashboard */}
              <NavLink
                to="/"
                className="flex items-center justify-center w-10 h-10   text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
              >
                <span className="text-3xl ">
                  <MdDashboard />
                </span>
              </NavLink>

              {/* users (admin only) */}
              {state.role === "admin" && (
                <NavLink
                  to="/users"
                  className="flex items-center justify-center w-10 h-10  text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
                >
                  <span className="text-3xl">
                    <FaUsers />
                  </span>
                </NavLink>
              )}

              {/* teams */}
              <NavLink
                to="/invitations"
                className="flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
              >
                <span className="text-3xl">
                  {" "}
                  <PiMicrosoftTeamsLogoDuotone />
                </span>
              </NavLink>

              {/*projects  (both users)*/}
              <NavLink
                to="/projects"
                className="flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
              >
                <span className="text-3xl">
                  {" "}
                  <AiOutlineAlert />
                </span>
              </NavLink>
            </div>

            {/* Collapsed Bar:- middle part (users ) */}
            <div className="flex flex-col items-center gap-2 py-2 mt-2 border-t border-gray-700">
              {/* Inventory (both the users)  */}
              <NavLink
                to="/inventory"
                className="flex items-center justify-center w-10 h-10  text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
              >
                <span className="text-3xl">
                  <MdOutlineInventory2 />
                </span>
              </NavLink>

              {/* requirements (admin only) */}
              {state.role === "admin" && (
                <NavLink
                  to="/requirements"
                  className="flex items-center justify-center w-10 h-10  text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
                >
                  <span className="text-3xl">
                    <FaBasketShopping />
                  </span>
                </NavLink>
              )}

              {/* Expenses (admin only) */}
              {state.role === "admin" && (
                <NavLink
                  to="/expenses"
                  className="flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
                >
                  <span className="text-3xl">
                    <FaWallet />
                  </span>
                </NavLink>
              )}

              {/*Allocations (both the users)*/}
              <NavLink
                to="/allocations"
                className="flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
              >
                <span className="text-3xl">
                  <FaGifts />
                </span>
              </NavLink>
            </div>

            {/* collapsed bar:- bottom part (setting) */}
            <div className="flex flex-col items-center  py-2 gap-2 my-2 border-t border-gray-700 ">
              {/* certificates (both the users)  */}
              <NavLink
                to="/certificates"
                className="flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
              >
                <span className="text-3xl">
                  <PiCertificate />
                </span>
              </NavLink>

              {/* messages (both the users)  */}
              <NavLink
                to="/messages"
                className="flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
              >
                <span className="text-3xl">
                  <MdOutlineMessage />
                </span>
              </NavLink>

              {/* settings (admin only) */}
              {state.role === "admin" && (
                <NavLink
                  to="/settings"
                  className="flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-700 rounded hover:text-gray-800 hover:bg-gray-200 transition-all"
                >
                  <span className="text-3xl">
                    <IoSettingsOutline />
                  </span>
                </NavLink>
              )}
            </div>
          </div>

          {/* Collapsed Bar :-  (logout) */}
          <Link
            to="/login"
            className="flex gap-2 items-center justify-center w-full h-16 mt-auto border-t border-gray-700 hover:bg-red-900 hover:text-white transition-all text-red-600 p-2"
            onClick={logoutHandler}
          >
            <span className="text-3xl">
              {" "}
              <AiOutlineLogout />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
