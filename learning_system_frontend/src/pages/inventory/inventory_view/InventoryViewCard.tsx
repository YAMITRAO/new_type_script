import compoImg from "../../../assets/compo/none.jpg";
import backgroundImg from "../../../assets/background/2.webp";
import { Component_details_int } from "./types";

interface Inventory_card_int {
  compDetails: Component_details_int;
}

const InventoryViewCard: React.FC<Inventory_card_int> = ({ compDetails }) => {
  console.log("Component details", compDetails);
  return (
    <div className=" m-2 pt-1 pb-8 px-1 w-[320px] h-[210px] rounded-md relative ">
      {/* image view */}
      <div className=" rounded-md border border-slate-100 h-full w-full flex justify-center items-center opacity-100 relative">
        {/* to provide blur effect */}
        <div
          style={{
            backgroundImage: `url(${
              compDetails.componentImageUrl || backgroundImg || compoImg
            })`,
            backgroundSize: "cover",
            filter: "blur(3px)",
            backgroundColor: "rgba(35,35,35,0.1)",
          }}
          className="absolute top-0 left-0 rounded-md border border-slate-100 h-full w-full flex justify-center items-center opacity-55 -z-20"
        ></div>

        <img
          className="max-w-[96%] max-h-[96%] rounded-md bg-transparent shadow-lg hover:z-40  hover:scale-125 transition-all"
          src={compDetails.componentImageUrl || compoImg}
          alt="Image url"
        />
      </div>

      {/* info container */}
      <div className="w-[80%] border  absolute -bottom-[0px] left-[calc(20%/2)] text-slate-300 bg-[#513320] opacity-95 flax flex-col rounded-md">
        <div className="w-full py-1 text-center bg-gray-800 rounded-t-md text-md font-medium capitalize truncate text-ellipsis px-1 ">
          {compDetails.componentTitle}
        </div>
        <div className="w-full flex gap-2 justify-around py-1  rounded-b-md bg-gray-400 text-slate-800">
          <div className="w-fit text-slate-800 font-medium">
            Avl: {compDetails.availableQuantity}
          </div>
          <div className="w-fit gap-1 flex">
            <input
              type="number"
              className="max-w-12 h-fit indent-2 rounded bg-slate-300 outline-none"
              min="1"
              max={compDetails.availableQuantity}
            />
            <button className="bg-green-700 px-1 rounded text-slate-200 hover:scale-105 hover:bg-green-800 hover:text-slate-100">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryViewCard;
