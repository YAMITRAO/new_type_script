import { toast } from "react-toastify";
import InputCustom from "../../components/InputCustom";
import { enteredCredentials_login_inter } from "./types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInst from "../../api/AxiosInst";
import {
  ApiErrorResponse,
  ApiResponse,
  LoginUserDetails,
} from "../../api/ApiResponses";
import axios, { AxiosError } from "axios";

const Login = () => {
  const [enteredCredentials, setEnteredCredentials] =
    useState<enteredCredentials_login_inter>({
      email: "",
      password: "",
    });

  const navigate = useNavigate();

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
      let response = await axiosInst.post<ApiResponse<LoginUserDetails>>(
        "/user/login",
        {
          ...enteredCredentials,
        }
      );

      console.log("User sign up api response is :- ", response);
      localStorage.setItem("token", response.data.data.token);
      // if response is success then redirect to login page
      console.log("Response is ", response.data.message);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
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

  console.log("Entered credentials", enteredCredentials);
  return (
    <div className=" mx-auto bg-[#1f1f1f]   w-screen h-screen flex   items-center flex-col   md:flex-row md:justify-center text-white overflow-scroll">
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
  );
};

export default Login;
