import { toast } from "react-toastify";
import InputCustom from "../../components/InputCustom";
import { enteredCredentials_login_inter } from "./types";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInst from "../../api/AxiosInst";
import {
  ApiErrorResponse,
  ApiResponse,
  LoginUserDetails,
} from "../../api/ApiResponses";
import axios, { AxiosError } from "axios";
import { User } from "../../context/user_context/types";
import getUser from "../../helper/getUser";
import UserContext from "../../context/user_context/UserContext";

const Login = () => {
  const [enteredCredentials, setEnteredCredentials] =
    useState<enteredCredentials_login_inter>({
      email: "",
      password: "",
    });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // auth context data
  const { dispatch } = useContext(UserContext);

  // function to store entered credentials
  const enteredInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // function to handle signup api and submit click
  const submithandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // conditions before calling api
      setIsLoading(true);
      let response = await axiosInst.post<ApiResponse<LoginUserDetails>>(
        "/user/login",
        {
          ...enteredCredentials,
        }
      );

      console.log("User sign up api response is :- ", response);
      localStorage.setItem("token", response.data.data.token);
      window;
      const payload: User = {
        id: response.data.data._id,
        name: response.data.data.name,
        email: response.data.data.email,
        isAuth: true,
        isProjectRegistered: response.data.data.isProjectRegistered,
        role: response.data.data.role,
      };

      // set data to context
      dispatch({ type: "SET_USER", payload: payload });
      // if response is success then redirect to login page
      console.log("Response is ", response.data.message);
      toast.success(response.data.message);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        // console.log(error && error.response.);
        let api_error: AxiosError<ApiErrorResponse> = error;
        toast.error(api_error.response?.data.message);
        setEnteredCredentials((prev) => {
          return {
            ...prev,
            password: "",
          };
        });
      }
    }
  };

  const getUserDetails = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      // toast.error("Token is not avilable");
      return;
    }
    try {
      setIsLoading(true);
      const response = await getUser();
      console.log(response);
      // toast.success(response?.data.message || "Successfully login");
      const payload: User = {
        id: response.data.data._id,
        name: response.data.data.name,
        email: response.data.data.email,
        isAuth: true,
        isProjectRegistered: response.data.data.isProjectRegistered,
        role: response.data.data.role,
      };

      // set data to context
      dispatch({ type: "SET_USER", payload: payload });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log("error is ", error);
      // toast.error("Unknon Error Occured.");
    }
  };

  // getUser();

  useEffect(() => {
    // Check token and login user if it exists
    getUserDetails();
  }, []);
  console.log("Entered credentials", enteredCredentials);
  return (
    <>
      {isLoading ? (
        <div className="text-3xl font-bold text-yellow-600">Loading...</div>
      ) : (
        <div className="   w-screen h-full flex   items-center flex-col   md:flex-row md:justify-center text-white ">
          {/* left side container */}
          <div className=" h-full w-full flex  justify-center items-center mt-2">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="signup text on clipboard"
            />
          </div>

          {/* right side container */}
          <div className=" h-full w-full flex justify-center items-center p-4 px-6">
            {/* form container */}
            <div className=" w-full ">
              <form className=" w-full px-1 md:px-10 " onSubmit={submithandler}>
                <h2 className="text-3xl text-center bg-slate-600 py-1 border-2 border-slate-400 rounded-md mb-6">
                  Login
                </h2>

                {/* Email input */}
                <div className="flex flex-col mb-1">
                  <label className="text-lg font-mono">Email</label>
                  <InputCustom
                    name="email"
                    value={enteredCredentials.email}
                    placeholder=" Enter Email"
                    type="email"
                    isRequired={true}
                    onChange={enteredInputHandler}
                  />
                </div>

                {/* Password input */}
                <div className="flex flex-col mb-1">
                  <label className="text-lg font-mono">Password</label>
                  <InputCustom
                    name="password"
                    value={enteredCredentials.password}
                    placeholder=" Enter Password"
                    type="password"
                    isRequired={true}
                    onChange={enteredInputHandler}
                  />
                </div>

                {/* Don't have an account? */}
                <div className="flex flex-col mb-1">
                  <p className="text-right mt-auto text-md font-light">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="cursor-pointer text-red-500 font-normal hover:underline pr-2"
                    >
                      Signup
                    </Link>
                  </p>
                </div>

                {/* submit button */}
                <div className="flex flex-col mb-1">
                  <button
                    type="submit"
                    className="bg-blue-600 h-[40px] rounded-md border-none outline-none text-lg hover:bg-blue-700 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
