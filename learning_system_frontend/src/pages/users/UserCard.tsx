import ProgressRighWithImg from "../../components/ProgressRingWithImg";
import { MdDelete, MdEdit } from "react-icons/md";
// import { MdModeEdit } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { GoCheckCircle } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlinePreview } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import ConfirmDeleteCard from "../../components/ConfirmDeleteCard";
import { useState } from "react";
import axiosInst from "../../api/AxiosInst";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

interface UserCard_int {
  key?: string;
  _id: string;
  name: string;
  email: string;
  dob: string;
  userClass: string;
  userSec: string;
  imgUrl: string;
  isBlocked: boolean;
  callBack: () => void;
}

const UserCard: React.FC<UserCard_int> = ({
  name,
  dob,
  email,
  userClass,
  userSec,
  _id,
  imgUrl,
  isBlocked,
  callBack,
}) => {
  const [isDelConfVisible, setIsDelConfVisible] = useState(false);
  const [delUserId, setDelUserId] = useState("");
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editedValue, setEditedValue] = useState({
    name: "",
    email: "",
    dob: "",
    userClass: "",
    userSec: "",
  });

  // edit change handler (enter changed value to useState)
  const editChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedValue((prev) => ({ ...prev, [name]: value }));
  };
  // edit user function (to make input visible and inser existing value)
  const editUserHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEditVisible(true);
    setEditedValue({
      name: name,
      email: email,
      dob: dob,
      userClass: userClass,
      userSec: userSec,
    });
  };
  // edit submit handler (supply that data to api)
  const editSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let userId = e.currentTarget.value;
    console.log("Edit user", userId);
    console.log("Changed value is :- ", editedValue);
    console.log("previous values,", { name, dob, email, userClass, userSec });
    if (
      editedValue.name !== name ||
      editedValue.email !== email ||
      editedValue.dob !== dob ||
      editedValue.userClass !== userClass ||
      editedValue.userSec !== userSec
    ) {
      let confirmation = confirm("Are you sure you want to edit this user?");
      if (!confirmation) {
        return;
      }
      try {
        // alert("APi values sent");
        const response = await axiosInst.post(
          `/user/edit-user/${userId}`,
          {
            ...editedValue,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Response is :-", response);
        toast.success("Successfully Edited");
        setIsEditVisible(false);
        callBack();
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    } else {
      alert("Chnage is not allowed. All values are same");
    }
  };

  // blockuser function
  const blockUserHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let confirmation = confirm("Are you sure you want to block this user?");
    if (!confirmation) {
      return;
    }
    let userId = e.currentTarget.value;
    console.log("block user", userId);

    try {
      const response = await axiosInst.post(`/user/block-user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Response is :-", response);
      toast.success("Successfully Blocked");
      //  toast.success(response.data.data.message);
      callBack();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  // unblock user function
  const unblockHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let confirmation = confirm("Are you sure you want to unblock this user?");
    if (!confirmation) {
      return;
    }
    let userId = e.currentTarget.value;
    console.log("Unblock user", userId);

    try {
      const response = await axiosInst.post(`/user/unblock-user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Response is :-", response);
      toast.success("Successfully Unblocked");
      //  toast.success(response.data.data.message);
      callBack();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  // delete user handler
  const deleteUserHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDelConfVisible(true);
    setDelUserId(e.currentTarget.value);
  };

  console.log("edited value is", editedValue);

  return (
    <div
      className="relative pb-3 pt-6 bg-slate-200 h-[260px] w-[210px] flex flex-col gap-1 items-center  shadow-[2px_2px_2px_rgba(200,200,200,0.7)] rounded "
      style={{ background: isBlocked ? "#a88532" : "" }}
    >
      {/* delete confirmation card with absolute position */}
      {isDelConfVisible && (
        <ConfirmDeleteCard
          callBack={() => callBack()}
          onCancel={() => setIsDelConfVisible(false)}
          userId={delUserId}
        />
      )}

      {/* view user button */}
      <Link
        to={`/user/view/${_id}`}
        className="absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer hover:text-gray-700 hover:scale-105 transition-all"
      >
        <IoEye />
      </Link>
      {/* image and progress bar  */}
      <ProgressRighWithImg
        size={70}
        strokeWidth={3}
        percentage={45}
        color={"#fb5607"}
        imgUrl={imgUrl}
      />

      {/* name of user */}
      <div className="px-4">
        {!isEditVisible ? (
          <h1 className="text-lg text-slate-800 font-medium flex items-center">
            {name ? name : "Test User"}{" "}
          </h1>
        ) : (
          <input
            type="text"
            className="w-full bg-gray-300 indent-2 outline-none border rounded-md font-normal"
            name="name"
            value={editedValue.name}
            onChange={editChangeHandler}
            autoFocus={false}
          />
        )}
      </div>

      {/* email and dob */}
      <div className="w-full font-medium  flex flex-col gap-1 items-start text-md text-slate-700 px-4">
        {!isEditVisible ? (
          <div className="flex items-center gap-1">
            DOB: <span className="font-normal">{dob}</span>{" "}
            {/* <span className="ml-1 p-1 cursor-pointer hover:scale-105 text-sm hover:bg-green-600 rounded-full hover:text-white transition-all">
            <MdEdit />
          </span> */}
          </div>
        ) : (
          <input
            type="date"
            className="w-full bg-gray-300 text-black indent-2 outline-none border rounded-md font-normal"
            name="dob"
            value={editedValue.dob}
            onChange={editChangeHandler}
            autoFocus={false}
          />
        )}

        {!isEditVisible ? (
          <div className="max-w-full overflow-hidden text-ellipsis truncate ">
            Email: <span className="font-normal">{email}</span>
          </div>
        ) : (
          <input
            className="w-full bg-gray-400  indent-2 outline-none border-none  rounded-md font-normal"
            name="email"
            value={editedValue.email}
            onChange={editChangeHandler}
            autoFocus={false}
            disabled
          />
        )}

        <div className="  flex justify-start gap-1 text-md text-slate-700 w-full ">
          {!isEditVisible ? (
            <div>
              Class: <span className="font-normal">{userClass}</span>
            </div>
          ) : (
            <input
              className="w-full bg-gray-300 text-black indent-2 outline-none border rounded-md font-normal"
              name="userClass"
              value={editedValue.userClass}
              onChange={editChangeHandler}
              autoFocus={false}
            />
          )}
          {!isEditVisible ? (
            <div className="">
              Sec: <span className="font-normal">{userSec}</span>
            </div>
          ) : (
            <input
              className="w-full bg-gray-300 text-black indent-2 outline-none border rounded-md font-normal"
              name="userSec"
              value={editedValue.userSec}
              onChange={editChangeHandler}
              autoFocus={false}
            />
          )}
        </div>
      </div>

      {/* class section  */}

      {/* action buttons */}
      <div className="w-full flex gap-2 justify-end mt-2 mr-4">
        {/* edit button */}
        {!isBlocked && (
          <>
            <button
              className="text-lg bg-green-700 p-1 text-slate-200 cursor-pointer rounded-full hover:bg-green-800 transition-all"
              value={_id}
              onClick={!isEditVisible ? editUserHandler : editSubmitHandler}
              title="Edit User"
            >
              {!isEditVisible ? <MdEdit /> : <GoCheckCircle />}
            </button>

            {isEditVisible && (
              <button
                className="text-lg bg-red-700 p-1 text-slate-200 cursor-pointer rounded-full hover:bg-red-800 transition-all"
                value={_id}
                onClick={() => setIsEditVisible(false)}
                title="Close Form"
              >
                <RxCrossCircled />
              </button>
            )}
          </>
        )}

        {/* block button */}
        {!isEditVisible && (
          <button
            className="text-lg bg-yellow-700 p-1 text-slate-200 cursor-pointer rounded-full hover:bg-yellow-800 transition-all"
            value={_id}
            onClick={isBlocked ? unblockHandler : blockUserHandler}
            style={{ background: isBlocked ? "green" : "" }}
            title={isBlocked ? "Unblock User" : "Block User"}
          >
            {isBlocked ? <CgUnblock /> : <MdBlock />}
          </button>
        )}

        {/* delete button */}
        {!isEditVisible && (
          <button
            className="text-lg bg-red-700 p-1 text-slate-200 cursor-pointer rounded-full hover:bg-red-800 transition-all"
            value={_id}
            onClick={deleteUserHandler}
            title="Delete User"
          >
            <MdDelete />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
