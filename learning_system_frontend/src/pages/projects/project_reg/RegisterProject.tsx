import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axiosInst from "../../../api/AxiosInst";

const RegisterProject = () => {
  const [count, setCount] = useState(0);
  const [requirementCount, setRequirementCount] = useState<string[]>([]);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const [requirement, setRequirement] = useState<Record<string, string>>();
  const [quantity, setQuantity] = useState<Record<string, string>>();

  // add requirement fields
  const addRequirementFields = () => {
    setCount((pre) => pre + 1);
    setRequirementCount((prev) => [...prev, `value${count}`]);
  };
  // delete requirement fields
  const deleteRequirementFields = (
    e: React.MouseEvent<HTMLButtonElement | HTMLTextAreaElement>
  ) => {
    let arr = requirementCount.filter((val) => val !== e.currentTarget.value);
    setRequirementCount(arr);
  };

  // onchange handler for requirement
  const onChangehandlerReq = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setRequirement((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onChangehandlerQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setQuantity((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // submit data to related api
  const handleSubmitToApi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // merging qty and req in single object
    let req_qty_mapped: Record<string, string> = {};
    if (requirement && quantity) {
      Object.keys(requirement).map((key) => {
        req_qty_mapped[key] = quantity[key];
      });
    }
    const data = {
      projectTitle,
      projectDesc,
      requirement: req_qty_mapped && req_qty_mapped,

      // requirementFromLab: {
      //   comp1: { quantity: 20 },
      //   comp2: { quantity: 30 },
      //   comp3: { quantity: 40 },
      // },

      // invitation: {
      //   invitation1: { invitationMail: "test2@gmail.com" },
      //   invitation2: { invitationMail: "test3@gmail.com" },
      //   invitation3: { invitationMail: "test4@gmail.com" },
      // },
    };
    console.log("Data at api is", data);

    try {
      const response = await axiosInst.post(
        "/user/add-project",
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Response is", response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Requirement and qty is", requirement, quantity);

  return (
    <>
      {/* register project form container */}
      <div className="w-full h-full  overflow-y-auto p-2 custom-scrollbar">
        {/* project registration project */}
        <form
          className=" p-10 flex flex-col "
          autoComplete="off"
          onSubmit={handleSubmitToApi}
        >
          {/* project title  */}
          <div className="relative z-0 w-full mb-5 group flex flex-col-reverse">
            <input
              type="text"
              name="projectTitle"
              value={projectTitle}
              className="peer pb-1 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
              placeholder=" "
              required
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <label
              htmlFor="floating_title"
              className="text-gray-500 font-medium text-lg peer-focus:text-gray-300 "
            >
              Project Title
            </label>
          </div>

          {/* requirement */}
          <div className="w-full flex flex-col gap-5 mb-10">
            {/* requirement button and heading */}
            <div className="flex gap-2 items-center w-full">
              <h2 className="text-gray-500 font-medium text-lg">
                Requirements
              </h2>
              <button
                type="button"
                className="text-2xl mt-1 text-gray-400 bg-gray-600 rounded-full hover:scale-100 hover:bg-gray-200 transition-all "
                onClick={addRequirementFields}
              >
                <IoAddCircle />
              </button>
            </div>

            {/* requirement input container */}
            <div className="flex gap-6 flex-wrap w-full justify-center">
              {requirementCount.map((val, index, arr) => (
                <div className="w-full flex gap-4" key={val}>
                  {/* component name field */}
                  <input
                    type="text"
                    name={val}
                    className="pb-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800
                placeholder-gray-600 indent-2 "
                    placeholder="Component Name"
                    required
                    onChange={onChangehandlerReq}
                  />
                  {/* quantity field */}
                  <input
                    type="number"
                    name={val}
                    className=" pb-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2 placeholder-gray-600"
                    placeholder="Quantity"
                    required
                    min="1"
                    max="10"
                    onChange={onChangehandlerQty}
                    title="maximum allowed qty is 10"
                  />

                  {index + 1 == arr.length && (
                    <button
                      type="button"
                      className="text-2xl mt-1 text-gray-400 bg-gray-600 rounded-full hover:scale-100 hover:bg-gray-200 transition-all "
                      onClick={addRequirementFields}
                    >
                      <IoAddCircle />
                    </button>
                  )}

                  <button
                    type="button"
                    className="w-fit text-gray-400 text-2xl hover:text-red-700 transition-all cursor-pointer "
                    value={val}
                    onClick={deleteRequirementFields}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/*project Description  */}
          <div className="w-full flex flex-col-reverse ">
            <textarea
              rows={1}
              name="projectDescription"
              value={projectDesc}
              className="pb-1 pt-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800
                placeholder-gray-600 indent-2 peer"
              onChange={(e) => setProjectDesc(e.target.value)}
              required
            />
            <label
              htmlFor="floating_title"
              className="text-gray-500 font-medium text-lg peer-focus:text-gray-300 "
            >
              Project Description
            </label>
          </div>

          {/* submit button */}
          <div className="w-full text-center mt-6">
            <button
              className="w-fit bg-slate-200 rounded  px-2 py-1 text-xl hover:bg-slate-400 hover:text-slate-200 transition-all"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterProject;