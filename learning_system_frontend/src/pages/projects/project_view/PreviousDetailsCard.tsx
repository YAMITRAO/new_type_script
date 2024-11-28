import { useContext, useEffect, useRef, useState } from "react";
import { projectDetails_int } from "./ProjectView";
import { IoAddCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInst from "../../../api/AxiosInst";
import { LuFolderEdit } from "react-icons/lu";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import UserContext from "../../../context/user_context/UserContext";

interface projectDetails {
  projectData: projectDetails_int | undefined;
  onSuccess: () => void;
}
const PreviousDetailsCard: React.FC<projectDetails> = ({
  projectData,
  onSuccess,
}) => {
  const { state } = useContext(UserContext);

  // to check for valid link inserted to hyperlink
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  const [isEdit, setIsEdit] = useState(false);
  const [projectDetails, setProjectDetails] = useState<projectDetails_int>();
  const [projectRequirements, setProjectRequirements] =
    useState<[string, unknown][]>();

  const [editedTitle, setEditedTitle] = useState<string>();
  const [editedDescription, setEditedDescription] = useState<string>();
  const [editedResources, setEditedResources] = useState<Record<string, {}>>(
    {}
  );

  // to handle the requirement
  const qtyRef = useRef();
  const reqRef = useRef();
  const [requirement, setRequirement] = useState<Record<string, string>>();
  const [quantity, setQuantity] = useState<Record<string, string>>();

  console.log("requirement ,,,,,,", requirement);
  console.log("quantity,,,,", quantity);

  // onchange handler for requirement
  function onChangehandlerReq(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    setRequirement((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const onChangehandlerQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setQuantity((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // useEffect(() => {
  //   setQuantity((prev) => {
  //     return { ...prev };
  //   });
  // }, [quantity]);

  // edit on change resources
  const onChangeResource = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("edit resources is ", editedResources);
    setEditedResources((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(editedResources);
  };

  // to edit form details(title, description)
  const editFormHandlerToApi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      editedTitle?.toLowerCase() === projectData?.projectTitle.toLowerCase() &&
      editedDescription?.toLowerCase() ===
        projectData?.projectDescription.toLowerCase() &&
      projectData?.projectResources === editedResources
    ) {
      toast.error("Values can't be same as previous");
      return;
    }

    try {
      // merging qty and req in single object
      let req_qty_mapped: Record<string, string> = {};
      if (requirement && quantity) {
        Object.keys(requirement).map((key) => {
          req_qty_mapped[requirement[key]] = quantity[key];
        });
      }
      // prevent undefined project id
      if (projectData) {
        const response = await axiosInst.put(
          `/user/edit-project-details/${projectData._id}`,
          {
            projectTitle: editedTitle,
            projectDescription: editedDescription,
            projectResources: editedResources,
            requirement: req_qty_mapped && req_qty_mapped,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        // to close edit fields
        setIsEdit(false);
        // to refetch the project data
        onSuccess();
        console.log("response is", response);
      } else {
        toast.error("Unknown error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  // to update project status
  const updateProjectStatus = async (status: string) => {
    if (!projectDetails) {
      return;
    }
    console.log("Update the status :-");
    console.log("Project id is:-", projectDetails._id);
    console.log("Status is :- ", status);

    let confirmation = false;
    if (status === "success") {
      confirmation = confirm("Are you sure you want to 'CONFIRM' the project?");
      if (!confirmation) {
        // toast("not allowd to update");
        return;
      }
    } else if (status === "rejected") {
      let test = prompt("Enter 'Confirm ' to update the status");
      if (test !== "Confirm") {
        toast.error("Confirmation failed!!!");
        return;
      }
    }

    try {
      const response = await axiosInst.patch(
        `/user/approve-as-success/${projectDetails._id}`,
        {
          approvalStatus: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Response is:- ", response);
      // function to refatch project data
      onSuccess();
      toast.success(response?.data.message || "Successfully updated");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Internal server error (updating project status)"
        );
      }
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Use effect triggered");
    // props data to useState
    setProjectDetails(projectData);
    // to fill requirement data
    if (projectData?.projectRequirement?.requirementOnCreation) {
      let requirements = Object.entries(
        projectData?.projectRequirement?.requirementOnCreation
      );
      // console.log("Requirements is :-", requirements);
      setProjectRequirements(requirements);
      // set data to requirements field
      requirements.forEach((val) => {
        setRequirement((prev) => {
          return { ...prev, [val[0]]: val[0] };
        });

        setQuantity((prev) => {
          return { ...prev, [val[0]]: `${val[1]}` };
        });
      });
    }
    // fill resources data
    if (projectData?.projectResources) {
      setEditedResources({ ...projectData?.projectResources });
    }
    // enter project details
    if (projectData) {
      setEditedTitle(projectData?.projectTitle);
      setEditedDescription(projectData?.projectDescription);
    }
  }, [projectData]);

  return (
    <div className="w-full min-w-[350px]   flex-col justify-center items-center ml-1">
      {/* owner details */}
      <div className="w-fill  mx-12 mt-4 flex-wrap text-slate-200 flex gap-1 bg-slate-700 p-2 rounded-md ">
        {/* name and class */}
        <div className="w-full flex justify-between text-slate-400 font-medium">
          <div className="w-fit  ">
            Name:{" "}
            <span className="text-slate-300 capitalize">
              {projectDetails?.createdBy.name}
            </span>
          </div>
          <div className="w-fit">
            {" "}
            Class:{" "}
            <span className="text-slate-300 capitalize">
              {projectDetails?.createdBy.userClass}
            </span>{" "}
          </div>
        </div>

        {/* email and sec */}
        <div className="w-full flex justify-between text-slate-400 font-medium">
          <div className="w-fit ">
            email:{" "}
            <span className="text-slate-300">
              {projectDetails?.createdBy.email}
            </span>
          </div>
          <div className="w-fit">
            {" "}
            Sec:{" "}
            <span className="text-slate-300 capitalize">
              {projectDetails?.createdBy.userSec}
            </span>{" "}
          </div>
        </div>

        <div className="w-full text-right">
          <span
            style={{
              background:
                projectDetails?.approvalStatus === "pending"
                  ? "#ca6702"
                  : projectDetails?.approvalStatus === "success"
                  ? "#003e1f"
                  : projectDetails?.approvalStatus === "rejected"
                  ? "#9b2226"
                  : "#1282a2",
            }}
            className="pb-1 px-1 rounded-md "
          >
            {" "}
            {projectDetails?.approvalStatus}
          </span>
        </div>
      </div>

      {/* project details */}
      {projectDetails && (
        <>
          {/* register project form container */}
          <div className="w-full h-full  overflow-y-auto p-2 custom-scrollbar">
            {/* project registration project */}
            <form
              className=" px-10 py-1 flex flex-col "
              autoComplete="off"
              onSubmit={editFormHandlerToApi}
            >
              {/* project title  */}
              <div className="relative z-0 w-full mb-4 group flex flex-col-reverse">
                {isEdit ? (
                  <input
                    type="text"
                    name="projectTitle"
                    value={editedTitle}
                    className="pb-1 mt-1 w-full text-md bg-transparent  border-2 rounded-md border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 outline-none indent-2 peer focus:border-gray-400"
                    placeholder=" "
                    required
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  <div className="py-0 pr-2 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-300 dark:border-gray-600 outline-none indent-2 capitalize rounded-md">
                    {projectDetails?.projectTitle}
                  </div>
                )}

                <label
                  htmlFor="floating_title"
                  className="text-gray-500 font-medium text-lg peer-focus:text-gray-300 "
                >
                  Project Title
                </label>
              </div>

              {/* requirement */}
              <div className="w-full flex flex-col gap-4 mb-4">
                {/* requirement button and heading */}
                <div className="flex gap-2 items-center w-full">
                  <h2 className="text-gray-500 font-medium text-lg">
                    Requirements
                  </h2>
                  <div
                    // type="button"
                    className="text-2xl mt-1 text-gray-400 bg-gray-600 rounded-full   transition-all cursor-not-allowed "
                    // onClick={addRequirementFields}
                  >
                    <IoAddCircle />
                  </div>
                </div>

                {/* requirement input container */}
                <div className="flex p-1 gap-4 flex-wrap w-full justify-center border-0 rounded-md">
                  {projectRequirements &&
                    projectRequirements.map((val, index, arr) => (
                      <div
                        className="w-full flex gap-4"
                        key={`${val[0]}+uniqueKay`}
                      >
                        {/* component name field */}
                        <input
                          style={{
                            border: isEdit ? "2px solid #444a50" : "",
                          }}
                          type="text"
                          name={val[0]}
                          value={requirement && requirement[val[0]]}
                          className="pb-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-300
                placeholder-gray-600 indent-2 rounded-md "
                          placeholder="Component Name"
                          required
                          disabled={!isEdit}
                          onChange={onChangehandlerReq}
                        />
                        {/* <div
                          style={{
                            color: isEdit ? "gray" : "",
                            border: isEdit ? "none" : "",
                          }}
                          className="pb-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800
                placeholder-gray-600 indent-2 "
                        >
                          {val[0]}
                        </div> */}
                        {/* quantity field */}
                        <input
                          style={{
                            border: isEdit ? "2px solid #444a50" : "",
                          }}
                          type="number"
                          name={val[0]}
                          // value={
                          //   (typeof val[1] == "string" && val[1]) || "none"
                          // }
                          value={quantity && quantity[val[0]]}
                          className=" pb-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2 placeholder-gray-600 rounded-md"
                          placeholder="Quantity"
                          required
                          disabled={!isEdit}
                          min="1"
                          max="10"
                          onChange={onChangehandlerQty}
                          title="maximum allowed qty is 10"
                        />

                        {/* <div
                          style={{
                            color: isEdit ? "gray" : "",
                            border: isEdit ? "none" : "",
                          }}
                          className=" pb-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2 placeholder-gray-600"
                        >
                          {(typeof val[1] == "string" && val[1]) || "none"}
                        </div> */}

                        {/* {index + 1 == arr.length && (
                          <button
                            type="button"
                            className="text-2xl mt-1 text-gray-400 bg-gray-600 rounded-full hover:scale-100 hover:bg-gray-200 transition-all "
                            // onClick={addRequirementFields}
                          >
                            <IoAddCircle />
                          </button>
                        )} */}

                        {/* <button
                          type="button"
                          className="w-fit text-gray-400 text-2xl hover:text-red-700 transition-all cursor-pointer "
                          value={val}
                          onClick={deleteRequirementFields}
                        >
                          <MdDelete />
                        </button> */}
                      </div>
                    ))}
                </div>
              </div>

              {/* resources */}
              {projectDetails?.projectResources && (
                <div className="w-full flex flex-col gap-5 mb-3">
                  {/* resource heading and button */}
                  <div className="flex gap-2 items-center w-full">
                    <h2 className="text-gray-500 font-medium text-lg">
                      Resources
                    </h2>
                    <button
                      type="button"
                      className="text-2xl mt-1 text-gray-400 bg-gray-600 rounded-full cursor-not-allowed "
                      // onClick={addResourceField}
                    >
                      <IoAddCircle />
                    </button>
                  </div>

                  {/* entries of resources */}
                  <div className="flex gap-2 flex-wrap w-full justify-center">
                    {projectDetails?.projectResources &&
                      Object.entries(projectDetails?.projectResources).map(
                        (val) => {
                          return (
                            <div className="w-full flex gap-1" key={val[0]}>
                              {/* resource input field */}
                              {isEdit ? (
                                <input
                                  type="text"
                                  name={val[0]}
                                  value={`${editedResources[val[0]]}`}
                                  className="p-1  w-full text-sm bg-transparent  border-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800
                placeholder-gray-600 indent-2 rounded-md "
                                  placeholder="Resource link here ex. youtube, drive etc."
                                  required
                                  disabled={!isEdit}
                                  onChange={onChangeResource}
                                />
                              ) : (
                                <div className="w-full flex gap-2 pb-1 bg-transparent   placeholder-gray-600 indent-2 text-slate-300 text-sm">
                                  {/* resource title */}
                                  <div className=" w-fit font-medium py-0 pr-2  text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-300 dark:border-gray-600 outline-none indent-2 capitalize rounded-md">
                                    {val[0]}
                                  </div>
                                  {/* link address */}
                                  <div className=" px-1 text-ellipsis truncate  text-slate-500 py-0 pr-2 w-fit text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 outline-none indent-2 rounded-md">{`${val[1]}`}</div>
                                  {/* resource link */}
                                  <div className="w-fit py-0 pr-2  text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-300 dark:border-gray-600 outline-none indent-2 capitalize rounded-md">
                                    <a
                                      href={`${
                                        regex.test(`${val[1]}`)
                                          ? val[1]
                                          : "javascript:void(0);"
                                      }`}
                                      className="text-blue-500 font-medium"
                                      target={`${
                                        regex.test(`${val[1]}`) ? "_blank" : ""
                                      }`}
                                    >
                                      {regex.test(`${val[1]}`) ? (
                                        <span className=" hover:text-blue-700 transition-all">
                                          Click to Open
                                        </span>
                                      ) : (
                                        <span className="text-red-500 hover:text-red-700 transition-all">
                                          Invalid Link
                                        </span>
                                      )}
                                    </a>
                                  </div>
                                </div>
                              )}
                              {/* <button
                              type="button"
                              className="w-fit text-gray-400 text-2xl hover:text-red-700 transition-all cursor-pointer "
                              // value={val}
                              // onClick={deleteResourceField}
                            >
                              <MdDelete />
                            </button> */}
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              )}

              {/*project Description  */}
              <div className="w-full flex flex-col-reverse ">
                {isEdit ? (
                  <textarea
                    rows={8}
                    name="projectDescription"
                    value={editedDescription}
                    className="p-2 w-full text-sm text-justify rounded-md bg-transparent border-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800
                placeholder-gray-600 indent-2 peer custom-scrollbar"
                    onChange={(e) => setEditedDescription(e.target.value)}
                    required
                  />
                ) : (
                  <div
                    className="max-h-[200px] px-2  overflow-y-auto py-2  w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800
                placeholder-gray-600 indent-2 peer custom-scrollbar text-justify rounded-md"
                  >
                    {projectDetails?.projectDescription}
                  </div>
                )}

                <label
                  htmlFor="floating_title"
                  className="text-gray-500 font-medium text-lg peer-focus:text-gray-300 "
                >
                  Project Description
                </label>
              </div>

              {/* different operational buttons */}
              {state.role === "admin" && (
                <div className="w-full text-center mt-6">
                  {isEdit && projectDetails.approvalStatus !== "rejected" ? (
                    // cancel button
                    <div className="w-full flex gap-2">
                      <div
                        className="w-full  rounded text-center text-gray-200 bg-yellow-800  hover:bg-yellow-900 px-2 py-1 cursor-pointer text-xl transition-all"
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </div>
                      {/* submit button */}
                      <button
                        className="w-full  rounded text-center bg-green-800 text-gray-200 hover:bg-green-900 px-2 py-1 text-xl transition-all"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    projectDetails.approvalStatus !== "rejected" && (
                      <div
                        className="rounded  px-2 py-1 text-xl   transition-all flex justify-between items-center text-slate-200 "
                        // onClick={() => setIsEdit(true)}
                      >
                        {/* buttons to approve or reject */}
                        <div className="w-fit">
                          {projectDetails.approvalStatus === "pending" && (
                            <div className="w-fit flex gap-1 text-3xl">
                              {/* approve button */}
                              <span
                                title="approve"
                                className="cursor-pointer text-green-700 hover:scale-110 hover:text-green-800 transition-all"
                                onClick={() => updateProjectStatus("success")}
                              >
                                <IoCheckmarkCircleOutline />
                              </span>

                              {/* reject button */}
                              <span
                                title="reject"
                                className="text-[28px] cursor-pointer text-red-700 hover:scale-110 hover:text-red-800 transition-all "
                                onClick={() => updateProjectStatus("rejected")}
                              >
                                <RxCrossCircled />{" "}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* button to edit and delete project */}
                        <div className="w-fit flex gap-1 text-2xl items-center gap-2">
                          {/* edit button  */}
                          <span
                            className=" cursor-pointer text-yellow-700 hover:scale-110 hover:text-yellow-800 transition-all"
                            title="edit"
                            onClick={() => setIsEdit(true)}
                          >
                            <LuFolderEdit />
                          </span>

                          {projectDetails.approvalStatus == "success" && (
                            <span
                              title="reject"
                              className="text-[27px] cursor-pointer text-red-700 hover:scale-110 hover:text-red-800 transition-all "
                              onClick={() => updateProjectStatus("rejected")}
                            >
                              <RxCrossCircled />{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviousDetailsCard;
