import { Link, useNavigate } from "react-router-dom";
import InputCustom from "../../components/InputCustom";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInst from "../../api/AxiosInst";
import {
  ApiErrorResponse,
  ApiResponse,
  SigUpUserDetails,
} from "../../api/ApiResponses";
import axios, { AxiosError } from "axios";
import { enteredCredentials_signup_inter } from "./types";

const SignUp = () => {
  const [enteredCredentials, setEnteredCredentials] =
    useState<enteredCredentials_signup_inter>({
      name: "",
      email: "",
      dob: "",
      password: "",
      confirmPassword: "",
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
      if (enteredCredentials.password !== enteredCredentials.confirmPassword) {
        toast.error("Password Must be same");
        setEnteredCredentials((prev) => {
          return { ...prev, password: "", confirmPassword: "" };
        });
        return;
      } else if (enteredCredentials.password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        setEnteredCredentials((prev) => {
          return { ...prev, password: "", confirmPassword: "" };
        });
        return;
      } else if (new Date() < new Date(enteredCredentials.dob)) {
        toast.error("Date of birth must be in the past");
        setEnteredCredentials((prev) => {
          return { ...prev, dob: "", password: "", confirmPassword: "" };
        });
        return;
      }

      let response = await axiosInst.post<ApiResponse<SigUpUserDetails>>(
        "/user/signup",
        {
          ...enteredCredentials,
        }
      );

      console.log("User sign up api response is :- ", response);
      // if response is success then redirect to login page
      console.log("Response is ", response.data.message);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log(error && error.response.);
        let api_error: AxiosError<ApiErrorResponse> = error;
        toast.error(api_error.response?.data.message);
        setEnteredCredentials({
          name: "",
          email: "",
          dob: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };

  // console.log("Entered credentials ", enteredCredentials);
  return (
    <div className="  w-full h-full flex items-center flex-col   md:flex-row md:justify-center text-white ">
      {/* left side container */}
      <div className=" h-full w-full flex  justify-center items-center mt-2">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="signup text on clipboard"
        />
      </div>

      {/* right side container */}
      <div className=" h-full w-full flex justify-center items-center py-4 px-6 mt-2">
        {/* form container */}
        <div className=" w-full ">
          <form className=" w-full px-1 md:px-10 " onSubmit={submithandler}>
            <h2 className="text-3xl text-center bg-slate-600 py-1 border-2 border-slate-400 rounded-md mb-6">
              Sign Up
            </h2>

            {/* name input */}
            <div className="flex flex-col mb-1">
              <label className="text-lg font-mono">Name</label>
              <InputCustom
                name={"name"}
                value={enteredCredentials.name}
                placeholder="Enter Full Name"
                isRequired={true}
                onChange={enteredInputHandler}
              />
            </div>

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

            {/* DOB input */}
            <div className="flex flex-col mb-1">
              <label className="text-lg font-mono">DOB</label>
              <InputCustom
                name="dob"
                value={enteredCredentials.dob}
                placeholder=" Enter Date of Birth"
                type="date"
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

            {/* Confirt Password input */}
            <div className="flex flex-col mb-1">
              <label className="text-lg font-mono">Confirm Password</label>
              <InputCustom
                name="confirmPassword"
                value={enteredCredentials.confirmPassword}
                placeholder=" Reenter Password"
                type="password"
                isRequired={true}
                onChange={enteredInputHandler}
              />
            </div>

            {/* have an account */}
            <div className="flex flex-col mb-1">
              <p className="text-right mt-auto text-md font-light">
                Already have an account,{" "}
                <Link
                  to="/login"
                  className="cursor-pointer text-red-500 font-normal hover:underline pr-2"
                >
                  Login
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

export default SignUp;
