import { useContext, useState } from "react";
import UserContext from "../../../context/user_context/UserContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInst from "../../../api/AxiosInst";
import moment from "moment";
import { MdShoppingCartCheckout } from "react-icons/md";

interface CartCard_int {
  projectId: string;
  isComponentSelectionAllowed: boolean;
  selectedComponentsFromInventory?: {};
  onSuccess: () => void;
}

const CartCard: React.FC<CartCard_int> = ({
  projectId,
  isComponentSelectionAllowed,
  selectedComponentsFromInventory,
  onSuccess,
}) => {
  const { state } = useContext(UserContext);
  const [selectedComponent, setSelectedComponent] = useState([
    { id: 1, date: "10-12-2022", compName: "comp1", compStatus: "self" },
    { id: 2, date: "09-03-2023", compName: "comp2", compStatus: "lab" },
    { id: 3, date: "10-03-2024", compName: "comp3", compStatus: "pending" },
  ]);

  console.log("Selecteddddd commmmmpppppppppppp", selectedComponent);

  // update user can select component or not
  const compSelectionUpdate = async (selectionStatus: boolean) => {
    let confirmation = false;
    if (selectionStatus) {
      confirmation = window.confirm(
        "Are you sure you want to allow user to select components?"
      );
    } else {
      confirmation = window.confirm(
        "Are you sure you want to disallow user to select components?"
      );
    }
    if (!confirmation) {
      toast.error("Not allowed to edit ");
      return;
    }
    try {
      // if (!projectData) {
      //   return;
      // }
      await axiosInst.put(
        `/user/project-selection-status-update/${projectId}`,
        {
          selectionStatus: selectionStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success("User edit status updated");
      onSuccess();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "Error updating user settings"
        );
      }
    }
  };

  return (
    <div className="w-full text-slate-300 p-4">
      {/* permission section */}
      <div className="w-full mb-2 rounded-md flex gap-2 justify-center">
        {state.role === "admin" && (
          <button className="p-1 py-2 w-fit flex">
            {" "}
            {isComponentSelectionAllowed ? (
              <span
                className="text-slate-200 text-lg px-2 py-2 bg-red-700 hover:bg-red-800 rounded-md"
                onClick={() => compSelectionUpdate(false)}
              >
                BlockCompSelection
              </span>
            ) : (
              <span
                className="text-slate-200 text-lg px-2 py-2  bg-green-700 hover:bg-green-800 rounded"
                onClick={() => compSelectionUpdate(true)}
              >
                AllowCompSelection
              </span>
            )}{" "}
          </button>
        )}
        {isComponentSelectionAllowed && (
          <Link
            to={`/project/select/comp/${projectId}`}
            className="w-fit flex items-center"
          >
            <span className="text-lg py-2 px-2 bg-green-700 text-slate-300 hover:bg-green-800 hover:text-slate-200 rounded-md">
              {" "}
              Click to select component
            </span>
          </Link>
        )}
        {/* cart icon with avilable quantity */}
        {selectedComponentsFromInventory && (
          <div className="w-fit text-2xl p-2 text-slate-900 flex justify-start items-center bg-slate-300 rounded-full relative">
            <MdShoppingCartCheckout />
            {/* cart count */}
            <div className="absolute -top-3 -right-3 text-sm rounded-full bg-red-700 text-slate-100 px-2 py-1 flex justify-center font-mono items-center">
              {selectedComponentsFromInventory
                ? Object.keys(selectedComponentsFromInventory).length
                : "0"}
            </div>
          </div>
        )}
      </div>
      {/* component details section */}
      {(state.role === "admin" || selectedComponent.length) && (
        <div className="w-full p-2">
          <table className="w-full">
            <thead className="w-full ">
              <tr className="w-full bg-transparent ">
                <th className="border w-[25%]">Date</th>
                <th className="border w-full">Component</th>
                <th className="border w-[30%] px-1">Status</th>
              </tr>
            </thead>

            <tbody className="w-full">
              {selectedComponent &&
                selectedComponent.map((val) => {
                  return (
                    <tr
                      key={val.id}
                      style={{
                        backgroundColor:
                          val.compStatus === "lab"
                            ? "#588157"
                            : val.compStatus === "self"
                            ? "#e76f51"
                            : "#e85d04",
                      }}
                      className=" w-full text-center text-slate-900 text-md
                    "
                    >
                      <td className="border w-[25%]">
                        {moment(val.date).format("Do MMM YY")}
                      </td>
                      <td className="border w-full capitalize">
                        {val.compName}
                      </td>
                      <td className="border w-[30%] capitalize font-medium text-sm px-1">
                        {val.compStatus}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CartCard;
