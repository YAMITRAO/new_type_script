import { useContext, useState } from "react";
import ProjectRegForm from "./ProjectRegForm";
import UserContext from "../../context/user_context/UserContext";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);

  const [isRegFormVisible, setIsRegFormVisible] = useState(false);

  console.log("context values are :-", state.id, dispatch);
  return (
    <>
      <div className="h-screen w-full">
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

        {state.isProjectRegistered && <div>Alreay registered</div>}
      </div>
    </>
  );
};

export default Home;
