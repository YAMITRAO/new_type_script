import { useContext, useEffect, useState } from "react";
import ProjectRegForm from "./ProjectRegForm";
import UserContext from "../../context/user_context/UserContext";
import ProjectView from "../../components/ProjectView";
import axiosInst from "../../api/AxiosInst";
import { ApiResponse } from "../../api/ApiResponses";

interface projectDetails {
  projectTitle: string;
  teamName: string;
  teamMembers: string;
  projectDescription: string;
}

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [isRegFormVisible, setIsRegFormVisible] = useState(false);
  // project details state
  const [projectDetails, setProjectsDetails] = useState<projectDetails[]>([
    {
      projectTitle: "Loading...",
      teamName: "",
      teamMembers: "",
      projectDescription: "",
    },
  ]);

  // get project details from backend
  const getProjectData = async () => {
    console.log("get project details triggered....");
    try {
      const response = await axiosInst.get<ApiResponse<projectDetails[]>>(
        "/user/get-first-project",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Propject data is :-", response);
      let responseDataArray: projectDetails[] = [];
      response.data.data.forEach((ele) => {
        responseDataArray.push({
          projectTitle: ele.projectTitle,
          teamName: ele.teamName,
          teamMembers: ele.teamMembers,
          projectDescription: ele.projectDescription,
        });
      });
      setProjectsDetails(responseDataArray);
    } catch (error) {}
  };

  useEffect(() => {
    getProjectData();
  }, []);

  console.log("context values are :-", state.id, dispatch);
  return (
    <>
      <div className="h-auto w-[100%] box-border">
        {!state.isProjectRegistered && (
          <>
            <div className=" text-3xl text-slate-200 flex justify-center mt-20">
              Register Project: &nbsp;
              <span
                className="text-red-500 hover:underline cursor-pointer transition-all"
                onClick={() => setIsRegFormVisible(true)}
              >
                {" "}
                Click Here
              </span>
            </div>

            {isRegFormVisible && (
              <ProjectRegForm onClick={() => setIsRegFormVisible(false)} />
            )}
          </>
        )}

        {/* {state.isProjectRegistered && <ProjectView />} */}
        {state.isProjectRegistered && (
          <div className=" flex flex-col gap-2 items-center box-border w-[100%] mt-4">
            {projectDetails.map((ele, index) => {
              // return <div key={index + "uniqueKety"}>{ele.projectTitle}</div>;
              return (
                <ProjectView
                  role={state.role}
                  key={index + "uniqueKety"}
                  projectTitle={ele.projectTitle}
                  teamName={ele.teamName}
                  teamMembers={ele.teamMembers}
                  projectDescription={ele.projectDescription}
                />
              );
            })}{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
