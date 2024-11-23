// import sideImg from "../assets/23810.jpg";
import sideImg from "../assets/project4.jpg";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";

interface projectViewProps_int {
  key?: string;
  projectTitle: string;
  approvalStatus: string;
  userClass?: string;
  userSec?: string;
  userEmail: string;
  userName: string;
  projectDescription: string;
  role: string;
}

const ProjectView: React.FC<projectViewProps_int> = ({
  projectTitle,
  projectDescription,
  approvalStatus,
  userEmail,
  userName,
  userClass,
  userSec,
  role,
}) => {
  console.log("Role is :- ", role);
  return (
    <div className="w-[94%] mx-auto md:w-[80%] lg:w-[500px] xl:w-[500px] md:h-[200px] box-border h-auto relative">
      {/* background */}
      {/* <div className="absolute -bottom-0 right-0 text-9xl opacity-20 text-slate-400 z-10 -rotate-45">
        <AiOutlineBarChart />
      </div> */}
      {/* edit button */}

      <div className="absolute top-1 right-[8px] text-xl flex flex-col items-center gap-1 z-50 text-slate-300 ">
        <Link
          to=""
          className="  text-[20px] hover:scale-105 transition-all text-md cursor-pointer hover:text-yellow-700 text-yellow-600"
        >
          <IoEye />
        </Link>
        {role === "admin" && (
          <div className="text-[17px]  hover:scale-105 transition-all hover:text-green-800 text-green-700    text-md cursor-pointer">
            {/* <MdEdit /> */}
            <FiEdit />
          </div>
        )}
        {role === "admin" && (
          <div className=" text-[20px] hover:scale-105 transition-allfont-bold   cursor-pointer pt-1 hover:text-red-800 text-red-700">
            <MdDelete />
          </div>
        )}
      </div>

      {/* card container */}
      <div className="flex flex-col  md:flex bg-white border border-gray-200 rounded-lg shadow md:flex-row  w-full h-full  dark:border-gray-700 dark:bg-gray-800  relative">
        {/* view button */}
        {/* <Link
          to=""
          className="absolute top-2 right-2 text-slate-300 text-2xl hover:text-slate-100 hover:scale-105 transition-all"
        >
          <IoEye />
        </Link> */}
        {/* status button */}
        <div
          className="absolute flex justify-center items-center h-[30px] w-[90px]  md:bottom-0 md:left-0 rounded-bl-md rounded-tr-md"
          style={{
            background:
              approvalStatus === "pending"
                ? "#ca6702"
                : approvalStatus === "success"
                ? "#003e1f"
                : approvalStatus === "rejected"
                ? "#9b2226"
                : "#1282a2",
          }}
        >
          <div className="text-slate-100 text-lg capitalize">
            {approvalStatus}
          </div>
        </div>

        {/*left side image */}
        <img
          className="object-cover rounded-t-lg w-full h-96 md:h-auto md:w-[35%] md:rounded-none md:rounded-s-lg border-r-4 border-slate-500"
          src={sideImg}
          alt=""
        />
        {/* right side of card*/}
        <div className="flex flex-col gap-2 w-full leading-normal  overflow-hidden pr-2 pl-4 pt-4 pb-2 ">
          {/* title */}
          <h5 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
            <span className=" text-slate-500 text-nowrap truncate ">
              Title:
            </span>{" "}
            {projectTitle}
          </h5>
          {/* email */}
          <div className="text-lg text-ellipsis truncate dark:text-slate-200 ">
            <span className="text-slate-500 font-medium">Email: </span>
            {userEmail}
          </div>

          {/* basic details */}
          <div className="w-full flex gap-2">
            <div className="w-fit text-md text-ellipsis truncate dark:text-slate-300 ">
              <span className="text-slate-500 font-medium">Name: </span>
              {userName}
            </div>
            <div className="w-fit text-md text-ellipsis truncate dark:text-slate-300 ">
              <span className="text-slate-500 font-medium">Class: </span>
              {userClass}
              {" " + userSec}
            </div>
          </div>

          {/* description */}
          <p className="w-full  font-normal text-slate-900 dark:text-slate-300 text-justify  text-overflow: ellipsis  truncate">
            <span className=" text-slate-500 font-medium">Desc: </span>
            {projectDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;

<></>;
