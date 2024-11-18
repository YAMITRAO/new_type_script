import ProgressRighWithImg from "../../components/ProgressRingWithImg";
import { MdDelete, MdEdit } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import ConfirmDeleteCard from "../../components/ConfirmDeleteCard";
import { useState } from "react";

interface UserCard_int {
  key?: string;
  _id: string;
  name: string;
  email: string;
  dob: string;
  imgUrl: string;
}

const UserCard: React.FC<UserCard_int> = ({
  name,
  dob,
  email,
  _id,
  imgUrl,
}) => {
  const [isDelConfVisible, setIsDelConfVisible] = useState(false);
  const [delUserId, setDelUserId] = useState("");

  // edit user function
  const editUserHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let value = e.currentTarget.value;
    console.log("Edit user", value);
  };

  // blockuser function
  const blockUserHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let value = e.currentTarget.value;
    console.log("block user", value);
  };

  // delete user handler
  const deleteUserHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDelConfVisible(true);
    setDelUserId(e.currentTarget.value);
  };

  return (
    <div className="relative pb-3 pt-6 bg-slate-200 h-[260px] w-[210px] flex flex-col gap-1 items-center  shadow-[2px_2px_2px_rgba(200,200,200,0.7)] rounded ">
      {/* delete confirmation card with absolute position */}
      {isDelConfVisible && (
        <ConfirmDeleteCard
          onCancel={() => setIsDelConfVisible(false)}
          userId={delUserId}
        />
      )}
      {/* image and progress bar  */}
      <ProgressRighWithImg
        size={70}
        strokeWidth={3}
        percentage={45}
        color={"#fb5607"}
        imgUrl={imgUrl}
      />

      {/* name of user */}
      <div>
        <h1 className="text-lg text-slate-800 font-medium">
          {name ? name : "Test User"}
        </h1>
      </div>

      {/* email and dob */}
      <div className="w-full font-medium  flex flex-col items-start text-md text-slate-700 px-4">
        <div>
          DOB: <span className="font-normal">{dob}</span>
        </div>
        <div className="max-w-full overflow-hidden text-ellipsis truncate ">
          Email: <span className="font-normal">{email}</span>
        </div>
        <div className="  flex justify-start gap-1 text-md text-slate-700 ">
          <div>
            Class: <span className="font-normal">10th</span>
          </div>
          <div className="">
            Sec: <span className="font-normal">C</span>
          </div>
        </div>
      </div>

      {/* class section  */}

      {/* action buttons */}
      <div className="w-full flex gap-2 justify-end mt-2 mr-4">
        {/* edit button */}
        <button
          className="text-lg bg-green-700 p-1 text-slate-200 cursor-pointer rounded-full hover:bg-green-800 transition-all"
          value={_id}
          onClick={editUserHandler}
        >
          <MdEdit />
        </button>

        {/* block button */}
        <button
          className="text-lg bg-yellow-700 p-1 text-slate-200 cursor-pointer rounded-full hover:bg-yellow-800 transition-all"
          value={_id}
          onClick={blockUserHandler}
        >
          <MdBlock />
        </button>

        {/* delete button */}
        <button
          className="text-lg bg-red-700 p-1 text-slate-200 cursor-pointer rounded-full hover:bg-red-800 transition-all"
          value={_id}
          onClick={deleteUserHandler}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
