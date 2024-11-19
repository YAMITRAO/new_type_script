import axios, { Axios } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInst from "../api/AxiosInst";

interface ConfirmDelete_int {
  userId: string;
  onCancel: () => void;
  callBack: () => void;
}
const ConfirmDeleteCard: React.FC<ConfirmDelete_int> = ({
  userId,
  onCancel,
  callBack,
}) => {
  const [enteredText, setEnteredText] = useState("");
  let confirmationText = "Confirm";

  const deleteButtonHandler = async () => {
    console.log("Del user id is", userId);
    if (enteredText === confirmationText) {
      try {
        const response = await axiosInst.post(`/user/delete-user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Response is :-", response);
        // toast.success("Deleted Successfully");
        toast.success(response.data.data.message);
        onCancel();
        callBack();
        setEnteredText("");
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
      return;
    }
    toast.error("Enter the correct confirmation text");
  };
  return (
    <div className="absolute bottom-0 right-0 z-20  w-fit rounded bg-gray-900 p-2 flex flex-col gap-1 ">
      {/* close the card button */}
      {/* <div className="text-lg font-bold absolute">{}</div> */}

      {/* Alert message */}
      <h1 className="text-md font-medium text-slate-500">
        Are you sure you want to delete?
      </h1>

      <div className="text-slate-400">
        <p>
          Enter it to delete "
          <span className="text-red-600 font-medium">{confirmationText}</span>"
        </p>
      </div>
      <input
        type="text"
        className="w-full py-1  rounded-md indent-2 text-slate-800 outline-none border border-slate-500"
        placeholder="Enter shown text here"
        value={enteredText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEnteredText(e.target.value)
        }
      />
      <div className="w-full flex gap-2 mt-2">
        {/* cancel button */}
        <button
          className="w-full px-2 py-1 bg-green-600 text-white rounded"
          onClick={() => onCancel()}
        >
          Cancel
        </button>

        {/* delete button */}
        <button
          className="w-full  px-2 py-1 bg-red-600 text-white rounded"
          onClick={deleteButtonHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteCard;
