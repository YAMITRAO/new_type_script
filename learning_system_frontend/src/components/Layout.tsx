import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <div>Hello India...</div> */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
