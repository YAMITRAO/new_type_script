import { useContext, useState } from "react";
import UserContext from "../context/user_context/UserContext";
import { AiOutlineAlert } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isDarkVisible, setIsDarkVisible] = useState(false);
  // context data
  const { state } = useContext(UserContext);
  return (
    <div
      className=" h-[calc(100vh-56px)] box-border w-fit border-r"
      // onMouseEnter={() => setIsDarkVisible(true)}
      // onMouseLeave={() =>
      //   setTimeout(() => {
      //     setIsDarkVisible(false);
      //   }, 100)
      // }
    >
      {/* side bar expended -dark */}
      {isDarkVisible && (
        <div className="flex flex-col items-center w-40 h-full overflow-hidden text-gray-400 bg-[#1f1f1f] rounded">
          <Link
            to="/"
            className=" flex items-center  w-full px-4 mt-3"
            onClick={() => setIsDarkVisible((prev) => !prev)}
          >
            {state.role === "admin" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-8 h-8 fill-current"
              >
                <g data-name="12-Sport">
                  <path d="m6.917 39.941-.7-1.875a15.006 15.006 0 0 0 0-28.132l.7-1.875a17.006 17.006 0 0 1 0 31.882z" />
                  <path d="M24 48a24 24 0 1 1 7.3-46.868l-.6 1.905a22 22 0 1 0-3.825 42.777l.258 1.984A24.345 24.345 0 0 1 24 48z" />
                  <path d="M23 1h2v46h-2z" />
                  <path d="M1 23h26v2H1zM45 48H33a1 1 0 0 1-1-1v-2h-1a1 1 0 0 1-1-1V15a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v29a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1 1zm-11-2h10v-2a1 1 0 0 1 1-1h1V15H32v28h1a1 1 0 0 1 1 1z" />
                  <path d="M42 15h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2h-4z" />
                  <path d="M45 11H33a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1zM34 9h10V7H34zM33 43h8v2h-8zM34 20h10v2H34zM34 36h10v2H34zM39 33a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-8 h-8 fill-current "
              >
                <g data-name="31-Education">
                  <path d="M24 38a14 14 0 1 1 14-14 14.015 14.015 0 0 1-14 14zm0-26a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12z" />
                  <path d="M27 48h-6a2 2 0 0 1-2-2v-3.681a18.873 18.873 0 0 1-4.415-1.833l-2.606 2.606a2 2 0 0 1-2.828 0L4.908 38.85a2 2 0 0 1 0-2.829l2.606-2.606A18.82 18.82 0 0 1 5.681 29H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3.681a18.82 18.82 0 0 1 1.833-4.415l-2.606-2.606a2 2 0 0 1 0-2.829l4.243-4.242a2 2 0 0 1 2.828 0l2.606 2.606A18.873 18.873 0 0 1 19 5.681V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3.681a18.873 18.873 0 0 1 4.415 1.833l2.606-2.606a2 2 0 0 1 2.828 0l4.243 4.242a2 2 0 0 1 0 2.829l-2.606 2.606A18.82 18.82 0 0 1 42.319 19H46a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3.681a18.82 18.82 0 0 1-1.833 4.415l2.606 2.606a2 2 0 0 1 0 2.829l-4.243 4.242a2 2 0 0 1-2.828 0l-2.606-2.606A18.873 18.873 0 0 1 29 42.319V46a2 2 0 0 1-2 2zm-12.569-9.773a1 1 0 0 1 .532.153 16.821 16.821 0 0 0 5.258 2.182 1 1 0 0 1 .779.976V46h6v-4.462a1 1 0 0 1 .779-.976 16.821 16.821 0 0 0 5.258-2.182 1 1 0 0 1 1.239.14l3.159 3.158 4.243-4.242-3.158-3.16a1 1 0 0 1-.14-1.24 16.815 16.815 0 0 0 2.183-5.258 1 1 0 0 1 .976-.778H46v-6h-4.461a1 1 0 0 1-.976-.778 16.815 16.815 0 0 0-2.183-5.258 1 1 0 0 1 .14-1.24l3.158-3.159-4.243-4.243-3.159 3.158a1 1 0 0 1-1.239.14 16.821 16.821 0 0 0-5.258-2.182A1 1 0 0 1 27 6.462V2h-6v4.462a1 1 0 0 1-.779.976 16.821 16.821 0 0 0-5.258 2.182 1 1 0 0 1-1.239-.14l-3.159-3.158-4.243 4.242 3.158 3.16a1 1 0 0 1 .14 1.24 16.815 16.815 0 0 0-2.183 5.258 1 1 0 0 1-.976.778H2v6h4.461a1 1 0 0 1 .976.778 16.815 16.815 0 0 0 2.183 5.258 1 1 0 0 1-.14 1.24l-3.158 3.159 4.243 4.243 3.159-3.158a1 1 0 0 1 .707-.293z" />
                  <path d="M29 37h-2V24.236l-3-6-3 6V37h-2V24a1 1 0 0 1 .105-.447l4-8a1.042 1.042 0 0 1 1.79 0l4 8A1 1 0 0 1 29 24z" />
                  <path d="M24 26a3.563 3.563 0 0 1-2.707-1.293C20.8 24.217 20.562 24 20 24v-2a3.563 3.563 0 0 1 2.707 1.293c.49.49.731.707 1.293.707s.8-.217 1.293-.707A3.563 3.563 0 0 1 28 22v2c-.562 0-.8.217-1.293.707A3.563 3.563 0 0 1 24 26z" />
                  <path d="M23 25h2v12h-2zM22 18h4v2h-4z" />
                </g>
              </svg>
            )}

            <span className="ml-2 text-md font-medium capitalize">
              {state.role}
            </span>
          </Link>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
              <Link
                to=""
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className="ml-2 text-sm font-medium">Dasboard</span>
              </Link>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Search</span>
              </a>
              <Link
                to="/"
                className="flex items-center w-full h-12 px-3 mt-2 text-gray-300 "
              >
                <span className="text-2xl">
                  {" "}
                  <AiOutlineBarChart />
                </span>
                <span className="ml-2 text-sm font-medium">Insights</span>
              </Link>
              <Link
                to="/"
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Docs</span>
              </Link>
            </div>
            <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
              <Link
                to="#"
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              >
                <span className="text-2xl">
                  <AiOutlineAlert />
                </span>
                <span className="ml-2 text-sm font-medium">Products</span>
              </Link>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Settings</span>
              </a>
              <a
                className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Messages</span>
                <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
              </a>
            </div>
          </div>
          <a
            className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Account</span>
          </a>
        </div>
      )}

      {/* side bar shrik dark */}
      {!isDarkVisible && (
        <div className="flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-[#1f1f1f] rounded">
          <a
            className="flex items-center justify-center mt-3"
            href="#"
            onClick={() => setIsDarkVisible((prev) => !prev)}
          >
            {state.role === "admin" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-8 h-8 fill-current"
              >
                <g data-name="12-Sport">
                  <path d="m6.917 39.941-.7-1.875a15.006 15.006 0 0 0 0-28.132l.7-1.875a17.006 17.006 0 0 1 0 31.882z" />
                  <path d="M24 48a24 24 0 1 1 7.3-46.868l-.6 1.905a22 22 0 1 0-3.825 42.777l.258 1.984A24.345 24.345 0 0 1 24 48z" />
                  <path d="M23 1h2v46h-2z" />
                  <path d="M1 23h26v2H1zM45 48H33a1 1 0 0 1-1-1v-2h-1a1 1 0 0 1-1-1V15a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v29a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1 1zm-11-2h10v-2a1 1 0 0 1 1-1h1V15H32v28h1a1 1 0 0 1 1 1z" />
                  <path d="M42 15h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2h-4z" />
                  <path d="M45 11H33a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1zM34 9h10V7H34zM33 43h8v2h-8zM34 20h10v2H34zM34 36h10v2H34zM39 33a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-8 h-8 fill-current "
              >
                <g data-name="31-Education">
                  <path d="M24 38a14 14 0 1 1 14-14 14.015 14.015 0 0 1-14 14zm0-26a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12z" />
                  <path d="M27 48h-6a2 2 0 0 1-2-2v-3.681a18.873 18.873 0 0 1-4.415-1.833l-2.606 2.606a2 2 0 0 1-2.828 0L4.908 38.85a2 2 0 0 1 0-2.829l2.606-2.606A18.82 18.82 0 0 1 5.681 29H2a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3.681a18.82 18.82 0 0 1 1.833-4.415l-2.606-2.606a2 2 0 0 1 0-2.829l4.243-4.242a2 2 0 0 1 2.828 0l2.606 2.606A18.873 18.873 0 0 1 19 5.681V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3.681a18.873 18.873 0 0 1 4.415 1.833l2.606-2.606a2 2 0 0 1 2.828 0l4.243 4.242a2 2 0 0 1 0 2.829l-2.606 2.606A18.82 18.82 0 0 1 42.319 19H46a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3.681a18.82 18.82 0 0 1-1.833 4.415l2.606 2.606a2 2 0 0 1 0 2.829l-4.243 4.242a2 2 0 0 1-2.828 0l-2.606-2.606A18.873 18.873 0 0 1 29 42.319V46a2 2 0 0 1-2 2zm-12.569-9.773a1 1 0 0 1 .532.153 16.821 16.821 0 0 0 5.258 2.182 1 1 0 0 1 .779.976V46h6v-4.462a1 1 0 0 1 .779-.976 16.821 16.821 0 0 0 5.258-2.182 1 1 0 0 1 1.239.14l3.159 3.158 4.243-4.242-3.158-3.16a1 1 0 0 1-.14-1.24 16.815 16.815 0 0 0 2.183-5.258 1 1 0 0 1 .976-.778H46v-6h-4.461a1 1 0 0 1-.976-.778 16.815 16.815 0 0 0-2.183-5.258 1 1 0 0 1 .14-1.24l3.158-3.159-4.243-4.243-3.159 3.158a1 1 0 0 1-1.239.14 16.821 16.821 0 0 0-5.258-2.182A1 1 0 0 1 27 6.462V2h-6v4.462a1 1 0 0 1-.779.976 16.821 16.821 0 0 0-5.258 2.182 1 1 0 0 1-1.239-.14l-3.159-3.158-4.243 4.242 3.158 3.16a1 1 0 0 1 .14 1.24 16.815 16.815 0 0 0-2.183 5.258 1 1 0 0 1-.976.778H2v6h4.461a1 1 0 0 1 .976.778 16.815 16.815 0 0 0 2.183 5.258 1 1 0 0 1-.14 1.24l-3.158 3.159 4.243 4.243 3.159-3.158a1 1 0 0 1 .707-.293z" />
                  <path d="M29 37h-2V24.236l-3-6-3 6V37h-2V24a1 1 0 0 1 .105-.447l4-8a1.042 1.042 0 0 1 1.79 0l4 8A1 1 0 0 1 29 24z" />
                  <path d="M24 26a3.563 3.563 0 0 1-2.707-1.293C20.8 24.217 20.562 24 20 24v-2a3.563 3.563 0 0 1 2.707 1.293c.49.49.731.707 1.293.707s.8-.217 1.293-.707A3.563 3.563 0 0 1 28 22v2c-.562 0-.8.217-1.293.707A3.563 3.563 0 0 1 24 26z" />
                  <path d="M23 25h2v12h-2zM22 18h4v2h-4z" />
                </g>
              </svg>
            )}
          </a>
          <div className="flex flex-col items-center mt-3 border-t border-gray-700">
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </a>
            <Link
              to="#"
              className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 bg-gray-700 rounded"
            >
              <span className="text-3xl">
                {" "}
                <AiOutlineBarChart />
              </span>
            </Link>
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
            </a>
          </div>
          <div className="flex flex-col items-center mt-2 border-t border-gray-700">
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              {/* <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg> */}
              <span className="text-3xl">
                <AiOutlineAlert />
              </span>
            </a>
            <a
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </a>
            <a
              className="relative flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
            </a>
          </div>
          <a
            className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default SideBar;
