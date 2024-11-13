import {
  ApiErrorResponse,
  ApiResponse,
  LoginUserDetails,
} from "../api/ApiResponses";
import axiosInst from "../api/AxiosInst";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

const getUser = async () => {
  try {
    let response = await axiosInst.get<ApiResponse<LoginUserDetails>>(
      "/user/me"
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      let api_error: AxiosError<ApiErrorResponse> = error;
      // toast.error(api_error.response?.data.message);
      localStorage.removeItem("token");
      throw new Error(api_error.response?.data.message);
    }
    console.log("error is:-", error && error);
    localStorage.removeItem("token");
    throw new Error("Unknown error occured.");
  }
};

export default getUser;
