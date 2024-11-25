import { useState } from "react";
import { toast } from "react-toastify";
import axiosInst from "../../../api/AxiosInst";
import axios from "axios";

const Invitationcard = () => {
  const [enteredMail, setEnteredMail] = useState("");
  const [isFound, setIsFound] = useState(false);

  // search find function
  const searchFindHandler = async () => {
    console.log("The entered value is ", enteredMail);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(enteredMail)) {
      toast.error("Enter a valid mail id.");
      return;
    }

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
      // toast.success("Founded searched user");
      setIsFound(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Error while searching");
      }
    }
  };
  return (
    <div className="   max-w-[350px] min-w-[350px] rounded-md p-4 text-slate-300">
      {/* search user by mail id for invitation */}
      <div className="w-full  flex">
        <input
          type="text"
          value={enteredMail}
          className="w-full outline-none border-none rounded-l-md h-8 indent-2 text-slate-800 bg-slate-200"
          placeholder="Enter email id "
          onChange={(e) => setEnteredMail(e.target.value)}
        />
        {!isFound ? (
          <button
            className="w-fit py-1 px-2 bg-[#09405e] rounded-r-md hover:bg-[#07344c] hover:text-slate-100 transition-all border-none outline-none"
            onClick={searchFindHandler}
          >
            {" "}
            Search
          </button>
        ) : (
          <>
            <button
              className="w-fit py-1 px-2 bg-green-700 rounded-r-md hover:bg-green-800 hover:text-slate-100 transition-all border-none outline-none"
              // onClick={()}
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
    </div>
  );
};

export default Invitationcard;
