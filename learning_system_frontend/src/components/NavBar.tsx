import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/user_context/UserContext";
// import UserContextData from "../context/user_context/UserContext";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    // dispatch({ type: "LOGOUT-USER" });
    dispatch({ type: "LOGOUT_USER" });
    navigate("/login");
  };
  return (
    <div className="w-full  h-14 box-border">
      {/* navbar container */}

      <div className="w-full h-14 fixed box-border z-50 top-0 border-b bg-slate-600">
        {true && (
          <nav className=" w-full h-full px-10 flex justify-between items-center text-white">
            {/* nav logo */}
            <div className="w-fit"></div>

            {/* nav Search */}
            <div className="w-auto h-auto hidden sm:block ">
              <div className="w-auto h-auto flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-fit md:min-w-[300px]  h-8 outline-none rounded-l-full indent-2 text-black"
                />
                <div className="h-8 w-12 text-white bg-slate-500 rounded-r-full flex justify-center items-center cursor-pointer hover:bg-slate-600 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="22"
                    height="22"
                    viewBox="0 0 50 50"
                    fill="white"
                  >
                    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                  </svg>
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
              {state.isAuth && (
                <div className="w-fit h-auto bg-green-600 font-medium px-2 py-1 rounded hover:bg-yellow-600">
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default NavBar;
