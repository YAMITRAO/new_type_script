import compoImg from "../../../assets/compo/none.jpg";
import backgroundImg from "../../../assets/background/1.webp";
import { Component_details_int } from "./types";
import { useContext } from "react";
import UserContext from "../../../context/user_context/UserContext";
import { useLocation } from "react-router-dom";

interface Inventory_card_int {
  compDetails: Component_details_int;
}

const InventoryViewCard: React.FC<Inventory_card_int> = ({ compDetails }) => {
  const { state } = useContext(UserContext);
  console.log("Component details", compDetails);
  let location = useLocation();
  return (
    <div className=" m-2 pt-1 pb-8 px-1 w-[320px] h-[210px]  rounded-md relative ">
      {/* image view */}
      <div className=" rounded-md border border-slate-100 h-full w-full flex justify-center items-center opacity-100 relative group">
        {/* admin hover extra information */}
        {state.role === "admin" && location.pathname === "/inventory" && (
          <div className="text-[#f35b04] hidden group-hover:block rounded-md absolute top-0 left-0 h-full w-full bg-[#073b4c] opacity-80">
            <div className="p-1 pl-2 font-medium text-md font-mono">
              {/* avilable */}
              {compDetails.allocatedQuantity && (
                <p>
                  Available:{" "}
                  <span className="text-white ">
                    {compDetails.availableQuantity}
                  </span>
                </p>
              )}

              {/* allocated */}
              {compDetails.allocatedQuantity && (
                <p>
                  Allocated:{" "}
                  <span className="text-white ">
                    {compDetails.allocatedQuantity}
                  </span>
                </p>
              )}
              {/* approx prize */}
              {compDetails.approxAmount && (
                <p>
                  Approx Prize:{" "}
                  <span className="text-white ">
                    {compDetails.approxAmount}
                  </span>
                </p>
              )}

              {/* isAllowedtoSelect */}
              {compDetails.isAllowedToSelect && (
                <p>
                  IsSelectAllowed:{" "}
                  <span className="text-white ">
                    {compDetails.isAllowedToSelect && "Yes"}
                  </span>
                </p>
              )}

              {/* isCostly*/}
              {compDetails.isCostly && (
                <p>
                  isCostly:{" "}
                  <span className="text-white font-bold">
                    {compDetails.isCostly && "Yes"}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* absolute add to paroject button with selection */}
        {/* allowed only on project add link */}
        {location.pathname !== "/inventory" && (
          <div className="w-fit absolute top-1 left-1 text-slate-900 text-lg font-medium">
            Avl: {compDetails.availableQuantity}
          </div>
        )}

        {location.pathname !== "/inventory" && (
          <form
            className="absolute top-1 right-1 w-fit gap-1 flex flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="number"
              className="max-w-12 h-fit indent-2 rounded bg-slate-300 outline-none"
              min="1"
              defaultValue={1}
              max={compDetails.availableQuantity}
            />
            <button
              type="submit"
              className="bg-green-700 px-1 rounded text-slate-200 hover:scale-105 hover:bg-green-800 hover:text-slate-100"
            >
              Select
            </button>
          </form>
        )}

        {/* to provide blur effect */}
        <div
          style={{
            // backgroundImage: `url(${
            //   compDetails.componentImageUrl || backgroundImg || compoImg
            // })`,
            // backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            // filter: "blur(3px)",
            // background: "rgba(255,255,255,1)",
          }}
          className="absolute top-0 left-0 rounded-md border border-slate-100 h-full w-full flex justify-center items-center opacity-70 -z-20 bg-slate-500"
        ></div>

        {location.pathname === "/inventory" ? (
          <img
            className="max-w-[96%] max-h-[96%] rounded-md bg-transparent shadow-lg hover:z-40  hover:scale-125 transition-all peer"
            src={compDetails.componentImageUrl || compoImg}
            alt="Image url"
          />
        ) : (
          <img
            className="max-w-[96%] max-h-[96%] rounded-md bg-transparent  transition-all peer"
            src={compDetails.componentImageUrl || compoImg}
            alt="Image url"
          />
        )}
      </div>
      {/* info container */}
      <div className="w-[80%]  border  absolute bottom-[15px] left-[calc(20%/2)] text-slate-300 bg-[#513320] opacity-95 flax flex-col rounded-md">
        <div className="w-full py-1 text-center bg-gray-800 rounded-t-md text-md font-medium capitalize truncate text-ellipsis px-1 ">
          {compDetails.componentTitle}
        </div>
      </div>
    </div>
  );
};

export default InventoryViewCard;
