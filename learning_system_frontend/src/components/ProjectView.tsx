import sideImg from "../assets/23810.jpg";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

interface projectViewProps_int {
  key?: string;
  projectTitle: string;
  teamName: string;
  teamMembers: string;
  projectDescription: string;
  role: string;
}

const ProjectView: React.FC<projectViewProps_int> = ({
  projectTitle,
  teamName,
  teamMembers,
  projectDescription,
  role,
}) => {
  console.log("Role is what::::-----", role);
  return (
    <div className=" w-11/12 box-border h-auto relative">
      {/* edit button */}
      {role === "admin" && (
        <div className="absolute top-2 right-3 text-xl flex gap-2">
          <div className="  bg-green-700 hover:bg-green-800 hover:scale-105 transition-all text-white   rounded-full p-1 text-md cursor-pointer">
            <CiEdit />
          </div>
          <div className=" bg-red-700 hover:bg-red-800 hover:scale-105 transition-all text-white font-bold  rounded-full p-[3px] cursor-pointer ">
            <MdDelete />
          </div>
        </div>
      )}

      <div className="flex flex-col  bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={sideImg}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal mt-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className=" text-yellow-600">Title:</span> {projectTitle}
          </h5>

          <div className="text-slate text-slate-300 font-bold uppercase">
            <span className=" text-yellow-600 ">Team:</span> {teamName} &nbsp;
            <span className="text-white font-bold font-mono">
              ({teamMembers})
            </span>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify pt-2">
            <span className=" text-yellow-600">Desc:</span>
            {projectDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;

<></>;
