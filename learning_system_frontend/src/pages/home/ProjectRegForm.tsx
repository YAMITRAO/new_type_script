import { useContext, useState } from "react";
import InputCustom from "../../components/InputCustom";
import axiosInst from "../../api/AxiosInst";
// import { AxiosResponse } from "axios";
import { ApiResponse, ProjectRegDetails } from "../../api/ApiResponses";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../context/user_context/UserContext";

interface ProjectregFormProb_int {
  onClick: () => void;
}

const ProjectRegForm: React.FC<ProjectregFormProb_int> = ({ onClick }) => {
  const [enteredCredentials, setEnteredCredentials] = useState({
    projectTitle: "",
    teamName: "",
    teamMembers: "",
    projectDescription: "",
  });

  // context data
  const { dispatch } = useContext(UserContext);
  // Input handler
  const enteredInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // form submit handler
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let token: string | null = localStorage.getItem("token");
      const response = await axiosInst.post<ApiResponse<ProjectRegDetails>>(
        "/user/add-project",
        {
          ...enteredCredentials,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClick();
      toast.success("Congrts! Successfully Registered..");
      // set isProjectreg to true
      dispatch({ type: "UPDATE_USER", payload: { isProjectRegistered: true } });
      console.log("Project submition details is :-, ", response.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      }
      onClick();
    }
    setEnteredCredentials({
      projectTitle: "",
      teamName: "",
      teamMembers: "",
      projectDescription: "",
    });
  };

  console.log(enteredCredentials);

  return (
    <div className="w-[100%]  h-[100vh]  fixed  box-border top-12 left-0 bottom-0 right-0 bg-[rgba(20,20,20,0.8)] flex justify-center items-center overflow-scroll">
      <div className="w-11/12 md:w-8/12 lg:w-5/12 h-[88vh] overflow-auto p-2  mb-3 relative border rounded bg-slate-800 ">
        {/* close button */}
        <div
          className="text-2xl font-semibold text-white bg-red-700 px-2 rounded inline-block border hover:bg-white hover:text-red-700 hover:border-red-700 transition-all cursor-pointer absolute right-3 top-3"
          onClick={onClick}
        >
          X
        </div>

        {/* User Details details */}
        <div className="w-full flex justify-center flex-nowrap gap-4 overflow-hidden text-slate-400 text-xl font-semibold">
          <div>Test user</div>
          <div>test@gmail.com</div>
        </div>

        {/*Project reg form */}
        <form
          className="w-full p-2 mt-2 text-white"
          onSubmit={formSubmitHandler}
        >
          {/* project title */}
          <div className="flex flex-col mb-1">
            <label className="text-lg font-mono">Project Title</label>
            <InputCustom
              name="projectTitle"
              value={enteredCredentials.projectTitle}
              placeholder=" Enter Project Title"
              type="text"
              isRequired={true}
              onChange={enteredInputHandler}
            />
          </div>

          {/* team name */}
          <div className="flex flex-col mb-1">
            <label className="text-lg font-mono">Team Name</label>
            <InputCustom
              name="teamName"
              value={enteredCredentials.teamName}
              placeholder=" Enter Name Of Team"
              type="text"
              isRequired={true}
              onChange={enteredInputHandler}
            />
          </div>

          {/* teamMembers */}
          <div className="flex flex-col mb-1">
            <label className="text-lg font-mono">Total Team Members</label>
            <InputCustom
              name="teamMembers"
              value={enteredCredentials.teamMembers}
              placeholder=" Enter Total Team Members"
              type="number"
              isRequired={true}
              onChange={enteredInputHandler}
            />
          </div>

          {/* project Description */}
          <div className="flex flex-col mb-1">
            <label className="text-lg font-mono">Project Description</label>
            <textarea
              rows={10}
              className="w-full outline-none border rounded-md text-black indent-2"
              name="projectDescription"
              value={enteredCredentials.projectDescription}
              onChange={(e) =>
                setEnteredCredentials((prev) => {
                  const { name, value } = e.target;
                  return {
                    ...prev,
                    [name]: value,
                  };
                })
              }
            ></textarea>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="mt-2 mb-2 bg-blue-600 w-full h-[40px] rounded-md text-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectRegForm;
