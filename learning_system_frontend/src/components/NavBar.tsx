import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/user_context/UserContext";
import { IoSearch } from "react-icons/io5";
// import UserContextData from "../context/user_context/UserContext";

const NavBar = () => {
  const { state } = useContext(UserContext);
  // const navigate = useNavigate();
  const location = useLocation();

  // const logoutHandler = () => {
  //   localStorage.removeItem("token");
  //   // dispatch({ type: "LOGOUT-USER" });
  //   dispatch({ type: "LOGOUT_USER" });
  //   navigate("/login");
  // };
  return (
    <div className="w-full  h-14 box-border">
      {/* navbar container */}

      <div className="w-full h-14 fixed box-border z-50 top-0 shadow-[0px_1px_2px_rgba(250,250,250,0.9)]  bg-slate-600">
        <nav className=" w-full h-full px-10 flex justify-between gap-2 items-center text-white">
          {/* nav logo */}
          <div className="w-fit"></div>

          {/* nav Search */}
          <div className="w-full md:w-8/12  h-auto  flex justify-center">
            <div className="w-11/12 h-auto flex justify-center">
              <input
                type="text"
                placeholder="Search"
                className="w-full md:min-w-[300px]  h-8 outline-none rounded-l-full indent-2 text-black"
              />
              <div className="h-8 w-12 text-white bg-slate-500 rounded-r-full flex justify-center items-center cursor-pointer hover:bg-slate-700 transition-all">
                <span className="text-xl">
                  <IoSearch />
                </span>
              </div>
            </div>
          </div>

          {/* nav buttons */}
          <div className="w-fit">
            {/*login button  */}
            {!state.isAuth && location.pathname !== "/login" && (
              <div className="w-fit h-auto bg-yellow-600 font-medium px-2 py-1 rounded hover:bg-yellow-600">
                {<Link to="/login">Login</Link>}
              </div>
            )}

            {/* logout button */}
            {/* {state.isAuth && (
              <div className="w-fit h-auto bg-green-600 font-medium px-2 py-1 rounded hover:bg-yellow-600">
                <button onClick={logoutHandler}>Logout</button>
              </div>
            )} */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
