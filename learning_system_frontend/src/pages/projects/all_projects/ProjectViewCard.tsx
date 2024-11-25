import sideImg from "../../../assets/project4.jpg";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInst from "../../../api/AxiosInst";

interface projectViewProps_int {
  _id: string;
  key?: string;
  projectTitle: string;
  approvalStatus: string;
  userClass?: string;
  userSec?: string;
  userEmail: string;
  userName: string;
  projectDescription: string;
  role: string;
  onSuccess: () => void;
}

const ProjectViewCard: React.FC<projectViewProps_int> = ({
  _id,
  projectTitle,
  projectDescription,
  approvalStatus,
  userEmail,
  userName,
  userClass,
  userSec,
  role,
  onSuccess,
}) => {
  console.log("Role is :- ", role);

  // update project status
  const updateProjectStatus = async (status: string) => {
    console.log("Update the status :-");
    console.log("Project id is:-", _id);
    console.log("Status is :- ", status);

    try {
      const response = await axiosInst.patch(
        `/user/approve-as-success/${_id}`,
        {
          approvalStatus: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Response is:- ", response);
      // function to refatch project data
      onSuccess();
      toast.success(response?.data.message || "Successfully updated");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Internal server error (updating project status)"
        );
      }
      console.log(error);
    }
  };
  return (
    <div className="w-[94%] mt-2 md:w-[80%] lg:w-[500px] xl:w-[400px] md:h-[200px] box-border h-auto relative">
      {/* edit button */}
      <div className="absolute top-1 right-[8px] text-xl flex flex-col items-center gap-1 z-50 text-slate-300 ">
        <Link
          to={`/project/view/${_id}`}
          className="  text-[21px] hover:scale-105 transition-all text-md cursor-pointer hover:text-yellow-700 text-yellow-600"
        >
          <IoEye />
        </Link>
        {/* project approval success button */}
        {role === "admin" && approvalStatus == "pending" && (
          <div
            className="text-[19px]  hover:scale-105 transition-all hover:text-green-800 text-green-700    text-md cursor-pointer"
            onClick={() => updateProjectStatus("success")}
          >
            {/* <MdEdit /> */}
            {/* <button> */}
            <FaRegCheckCircle />
            {/* </button> */}
          </div>
        )}
        {role === "admin" && approvalStatus == "pending" && (
          <div
            className=" text-[19px] hover:scale-105 transition-allfont-bold   cursor-pointer pt-1 hover:text-red-800 text-red-700"
            onClick={() => updateProjectStatus("rejected")}
          >
            <FaRegTimesCircle />
          </div>
        )}
      </div>

      {/* card container */}
      <div className="flex flex-col  md:flex bg-white border border-gray-200 rounded-lg shadow md:flex-row  w-full h-full  dark:border-gray-700 dark:bg-gray-800  relative">
        {/* status text */}
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

export default ProjectViewCard;

<></>;
