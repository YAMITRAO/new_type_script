import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      {/* <div>Hello India...</div> */}
      <NavBar />
      <main className="w-screen h-[calc(100vh-120px)] mt-14">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
