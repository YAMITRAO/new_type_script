import axios from "axios";
import projectImg from "../../assets/project4.jpg";
import { toast } from "react-toastify";
import axiosInst from "../../api/AxiosInst";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";

interface InvitationCardProps_int {
  invitationDocId: string;
  creatorName: string;
  projectTitle: string;
  projectId: string;
  onSuccess: () => void;
}

const InvitationCard: React.FC<InvitationCardProps_int> = ({
  creatorName,
  projectTitle,
  invitationDocId,
  projectId,
  onSuccess,
}) => {
  console.log("Invitation doc id is:---", invitationDocId);
  const invitationUpdateHandler = async (status: string) => {
    let confirmation = false;
    if (status === "accepted") {
      confirmation = confirm(
        "Are you sure you want to accept this invitation?"
      );
    } else if (status === "rejected") {
      confirmation = confirm(
        "Are you sure you want to reject this invitation?"
      );
    }
    if (!confirmation) {
      return;
    }

    try {
      const response = await axiosInst.patch(
        "/user/update-invitation-status",
        {
          invitationDocId,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Response is:-", response);
      toast.success(response.data.message || "Successfully updated the status");
      onSuccess();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Internal Server Error");
      }
    }
  };
  return (
    <div className="text-slate-300 w-fit">
      <div className="p-4 w-[280px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        {/* view button */}
        <Link
          to={`/project/view/${projectId}`}
          className="absolute top-2 right-2 text-2xl text-slate-400 w-fit hover:scale-110 hover:text-slate-200"
        >
          <IoEye />
        </Link>
        {/* invitation details */}
        <div className="flex flex-col items-center">
          {/* project image */}
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={projectImg}
            alt="project Image"
          />
          {/* project title */}
          <h5 className="mb-1 text-xl font-medium truncate text-gray-900 dark:text-white">
            {projectTitle}
          </h5>
          {/* creator name */}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {creatorName}
          </span>

          {/* buttons */}
          <div className=" w-full flex gap-4 justify-center mt-4 md:mt-6">
            {/* accept invitation */}
            <button
              value={invitationDocId}
              className="w-[35%] items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
              onClick={() => invitationUpdateHandler("accepted")}
            >
              Accept
            </button>

            {/* reject invitation */}
            <button
              value={invitationDocId}
              className="w-[35%] items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none  dark:bg-red-600 dark:hover:bg-red-700 "
              onClick={() => invitationUpdateHandler("rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
