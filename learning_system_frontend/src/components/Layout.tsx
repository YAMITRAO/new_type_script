import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useContext } from "react";
import UserContext from "../context/user_context/UserContext";

const Layout = () => {
  const { state } = useContext(UserContext);
  return (
    <>
      {/* body div */}
      <div className="box-border w-screen h-screen overflow-y-auto ">
        <NavBar />
        <div className=" w-full box-border h-auto flex overflow-y-auto ">
          {state.isAuth && <SideBar />}
          <main className=" box-border w-full h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar pb-2 relative">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
