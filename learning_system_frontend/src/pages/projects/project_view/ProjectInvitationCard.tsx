import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInst from "../../../api/AxiosInst";
import axios from "axios";
import moment from "moment";
import UserContext from "../../../context/user_context/UserContext";

interface Invitationcard_int {
  projectId: string;
  email: string;
  invitedUsers: {}; // object of user id and name
  invitationDocId: string;
  onSuccess: () => void; // callback function
}

const ProjectInvitationCard: React.FC<Invitationcard_int> = ({
  projectId,
  email,
  invitedUsers,
  invitationDocId,
  onSuccess,
}) => {
  const { state } = useContext(UserContext);
  const [enteredMail, setEnteredMail] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [invitedUserName, setInvitedUserName] = useState<string>("");
  const [invitedUserState, setInvitedUserState] = useState(
    Object.entries(invitedUsers)
  );
  console.log("Invited users are", Object.entries(invitedUsers));

  useEffect(() => {
    setInvitedUserState(Object.entries(invitedUsers));
  }, [invitedUsers]);

  // search find function
  const searchFindHandler = async () => {
    console.log("The entered value is ", enteredMail);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(enteredMail)) {
      toast.error("Enter a valid mail id.");
      return;
    } else if (enteredMail.toLowerCase() === email.toLowerCase()) {
      toast.error("You can't invite yourself!!!");
      return;
    }
    setIsloading(true);

    try {
      // API call to find the user
      const response = await axiosInst.post(
        "/user/find-invitation-mail",
        {
          email: enteredMail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Response is:-", response);
      setInvitedUserName(response.data.data.name);
      setTimeout(() => {
        setIsloading(false);
        setIsFound(true);
      }, 1000);
      // toast.success("Founded searched user");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Error while searching");
      }
      setIsloading(false);
    }
  };

  const invitationSubmitHandler = async () => {
    console.log("Invitation submit handler called");
    if (projectId === "none") {
      toast.error("Project id is not proper");
      return;
    }
    console.log("The invitation data is:-", projectId, enteredMail);
    try {
      const response = await axiosInst.post("/user/invite-user", {
        projectId: projectId,
        email: enteredMail,
        userName: invitedUserName,
        invitationDocId: invitationDocId,
      });
      // console.log("Invitation response is:-", response);
      setEnteredMail("");
      setInvitedUserName("");
      setIsFound(false);
      onSuccess();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message || "Error while submitting invitation"
        );
      }
    }
  };
  return (
    <div className="mt-4  h-fit w-full   max-w-full min-w-[350px] rounded-md p-6 md:p-4  text-slate-300">
      {/* search user by mail id for invitation */}
      {(state.email === email || state.role === "admin") && (
        <div className="w-full  flex">
          {!isLoading && (
            <input
              type="text"
              value={enteredMail}
              className="w-full outline-none border-none rounded-l-md h-8 indent-2 text-slate-800 bg-slate-200"
              placeholder="Enter email id "
              onChange={(e) => setEnteredMail(e.target.value)}
            />
          )}
          {/* search button */}
          {!isFound ? (
            !isLoading ? (
              <button
                className="w-fit py-1 px-2 bg-[#1679af] rounded-r-md hover:bg-[#07344c] hover:text-slate-100 transition-all border-none outline-none"
                onClick={searchFindHandler}
              >
                Search
              </button>
            ) : (
              <button
                className="w-full py-1 px-2 bg-[#072d41] rounded-md transition-all border-none outline-none"
                // onClick={searchFindHandler}
              >
                Searching...
              </button>
            )
          ) : (
            <>
              {/* invite button */}
              <button
                className="w-fit py-1 px-2 bg-green-700 rounded-r-md hover:bg-green-800 hover:text-slate-100 transition-all border-none outline-none"
                onClick={invitationSubmitHandler}
              >
                {" "}
                Invite
              </button>
              <button
                className="ml-2 w-fit py-1 px-2 bg-red-700 rounded-md hover:bg-red-800 hover:text-slate-100 transition-all border-none outline-none"
                onClick={() => {
                  setIsFound(false);
                  setEnteredMail("");
                }}
              >
                {" "}
                Cancel
              </button>
            </>
          )}
        </div>
      )}

      <table className="w-full mt-4">
        <thead className="w-full">
          <tr className="text-start border rounded">
            <th className="border rounded">Date</th>
            <th className="border">Name</th>
            <th className="border">Email</th>
            <th className="border">Status</th>
          </tr>
        </thead>
        <tbody>
          {invitedUserState.map((val: any) => {
            // if (val[1].invitationMail === email) {
            //   return;
            // }
            return (
              <tr
                key={val[1].invitationMail}
                className="text-center odd:bg-slate-800 "
                style={{
                  background: val[1].invitationMail === email ? "#431a00" : "",
                }}
              >
                {/* date */}
                <td className="border">
                  {moment(val[1].updatedAt).format("Do MMM YY")}
                </td>
                {/* name */}
                <td className="border capitalize">
                  {(val[1] && val[1].invitedUserName) || "none"}
                </td>
                {/* email */}
                <td className="border">{val[1] && val[1].invitationMail}</td>
                {/* status */}
                <td
                  style={{
                    color:
                      val[1].invitationStatus === "pending"
                        ? "orange"
                        : val[1].invitationStatus === "accepted"
                        ? "green"
                        : "#9d0208",
                  }}
                  className="border capitalize"
                >
                  {val[1].invitationMail === email
                    ? "Owner"
                    : val[1] && val[1].invitationStatus}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectInvitationCard;
