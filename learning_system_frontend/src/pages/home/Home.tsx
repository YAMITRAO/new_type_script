import { useContext } from "react";

import UserContext from "../../context/user_context/UserContext";
import Projects from "../projects/all_projects/Projects";
import Invitations from "../invitations/Invitations";

const Home = () => {
  const { state } = useContext(UserContext);
  return (
    <>
      <div className="flex flex-col">
        {state.role === "admin" ? (
          <Projects isAdmin={true} />
        ) : (
          <Projects isUser={true} />
        )}

        <Invitations />
      </div>
    </>
  );
};

export default Home;
