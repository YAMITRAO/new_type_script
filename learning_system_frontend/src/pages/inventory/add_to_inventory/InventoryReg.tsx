import axios from "axios";
import { useState } from "react";
import { Upload_compo_details_int } from "./types";
import { toast } from "react-toastify";
import axiosInst from "../../../api/AxiosInst";

const InventoryReg = () => {
  const formData_initialValues: Upload_compo_details_int = {
    componentTitle: "",
    availableQuantity: "",
    allocatedQuantity: "",
    isAllowedToSelect: true,
    isCostly: false,
    refrenceLink1: "",
    refrenceLink2: "",
    approxAmount: "",
    componentImageUrl: "",
    componentDescription: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState<Upload_compo_details_int>({
    ...formData_initialValues,
  });

  // handel input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    console.log("form data is", formData);
  };

  // image select handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile("");
    setImagePreview("");

    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const isImage = selectedFile.type.startsWith("image/");
      if (!isImage) {
        alert("Please select an image file (JPG, JPEG, PNG, GIF)");
        return;
      }
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
      console.log("File target is", e.target.files);
      console.log("File to useState is:-", selectedFile);
      console.log("File url is", objectUrl);
      // uploadToCloudnary(selectedFile);
    }
  };

  //  function to add file to cloudnary platform and return its url
  async function uploadToCloudnary(selectedFile: any) {
    if (!selectedFile) {
      // alert("First upload a image file");
      return "";
    }
    const formDataToCloudinary = new FormData();
    formDataToCloudinary.append("file", selectedFile);
    formDataToCloudinary.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDNARY_PRESET
    ); // Replace with your upload preset
    formDataToCloudinary.append(
      "cloud_name",
      import.meta.env.VITE_CLOUDNARY_CLOUN_NAME
    );
    try {
      const response = await axios.post(
        import.meta.env.VITE_CLOUDNARY_URL,
        formDataToCloudinary
      );
      console.log("Cloudnary upload response is", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  // handle submit form
  const handleSubmitToApi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // first upload file to cloudnary if(file avilable)
    setIsLoading(true);
    const componentImageUrl = await uploadToCloudnary(file);
    console.log("url is", componentImageUrl);
    setFormData((prev) => ({ ...prev, componentImageUrl }));
    const dataToAPi = {
      ...formData,
      componentImageUrl: componentImageUrl,
    };
    console.log("Now form data is", dataToAPi);
    try {
      // post data to backend
      const response = await axiosInst.post(
        "/inventory/add-to-inventory",
        {
          ...dataToAPi,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("add component response is", response);
      setIsLoading(false);
      setFormData({ ...formData_initialValues });
      setFile("");
      setImagePreview("");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      setIsLoading(false);
      // setFormData({ ...formData_initialValues });
    }
    setIsLoading(false);
    // setFormData({ ...formData_initialValues });
  };

  return (
    <>
      <div className="w-full h-full  overflow-y-auto p-2 custom-scrollbar">
        {/* component registration form */}
        <form
          className=" p-6 flex flex-col "
          autoComplete="off"
          onSubmit={handleSubmitToApi}
        >
          {/* form title */}
          <div className="w-full text-slate-300 text-2xl font-medium text-center mb-8">
            Add To Inventory
          </div>

          {/* component title  */}
          <div className="relative z-0 w-full mb-5 group flex flex-col-reverse">
            <input
              type="text"
              name="componentTitle"
              value={formData.componentTitle}
              className="peer pb-1 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
              placeholder=" "
              required
              onChange={handleInputChange}
            />
            <label
              htmlFor="floating_title"
              className="text-gray-500 font-medium text-lg peer-focus:text-gray-300 "
            >
              Component Title
            </label>
          </div>

          {/* quantity allocation */}
          <div className="w-full flex gap-5 ">
            {/* available quantity */}
            <div className="relative z-0 w-full mb-5 group flex flex-col-reverse">
              <input
                type="number"
                name="availableQuantity"
                value={formData.availableQuantity}
                className="peer pb-1 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <label
                htmlFor="floating_title"
                className="text-gray-500 font-medium text-md peer-focus:text-gray-300 "
              >
                Available Quantity
              </label>
            </div>

            {/* allocated quantity */}
            <div className="relative z-0 w-full mb-5 group flex flex-col-reverse">
              <input
                type="number"
                name="allocatedQuantity"
                value={formData.allocatedQuantity}
                className="peer pb-1 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <label
                htmlFor="floating_title"
                className="text-gray-500 font-medium text-md peer-focus:text-gray-300 "
              >
                Allocated Quantity
              </label>
            </div>
          </div>

          {/* radio buttons */}
          <div className="w-full flex gap-5 ">
            {/* for isAllowed to select */}
            <div className=" w-full mb-5 flex gap-2 items-center ">
              <input
                type="checkbox"
                name="isAllowedToSelect"
                checked={formData.isAllowedToSelect}
                className="w-4 h-4 border-2 border-gray-300 rounded-md focus:outline-none checked:bg-blue-500 checked:border-blue-500 peer"
                // required
                onChange={(e) => {
                  const { name, checked } = e.target;
                  setFormData((prev) => {
                    return { ...prev, [name]: checked };
                  });
                }}
              />
              <label
                htmlFor="floating_title"
                className="text-gray-500 font-medium text-md peer-checked:text-gray-300  "
              >
                isAllowedToSelect
              </label>
            </div>

            {/* iscostly */}
            <div className="w-full mb-5 flex gap-2 items-center">
              <input
                type="checkbox"
                name="isCostly"
                checked={formData.isCostly}
                className="w-4 h-4 border-2 border-gray-300 rounded-md focus:outline-none checked:bg-blue-500 checked:border-blue-500 peer"
                // required
                onChange={(e) => {
                  const { name, checked } = e.target;
                  setFormData((prev) => {
                    return { ...prev, [name]: checked };
                  });
                }}
              />
              <label
                htmlFor="floating_title"
                className="text-gray-500 font-medium text-md peer-checked:text-gray-300  "
              >
                IsCostly
              </label>
            </div>
          </div>

          {/*  ref link */}
          <div className="w-full flex gap-5 ">
            {/* available quantity */}
            <div className="relative z-0 w-full mb-4  group flex flex-col-reverse">
              <input
                type="text"
                name="refrenceLink1"
                value={formData.refrenceLink1}
                className="peer pb-1 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
                placeholder=" "
                onChange={handleInputChange}
              />
              <label
                htmlFor="floating_title"
                className="text-gray-500 font-medium text-md peer-focus:text-gray-300 "
              >
                Refrence Link 1
              </label>
            </div>

            {/* allocated quantity */}
            <div className="relative z-0 w-full mb-4 group flex flex-col-reverse">
              <input
                type="text"
                name="refrenceLink2"
                value={formData.refrenceLink2}
                className="peer pb-1 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
                placeholder=" "
                onChange={handleInputChange}
              />
              <label
                htmlFor="floating_title"
                className="text-gray-500 font-medium text-md peer-focus:text-gray-300 "
              >
                Refrence Link 2
              </label>
            </div>
          </div>

          {/* aprox amount entry */}
          <div className="relative z-0 w-full mb-5 group flex flex-col-reverse">
            <input
              type="number"
              name="approxAmount"
              value={formData.approxAmount}
              className="peer pb-1 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
              placeholder=""
              onChange={handleInputChange}
            />
            <label
              htmlFor="floating_title"
              className="text-gray-500 font-medium text-md peer-focus:text-gray-300 "
            >
              Approx Prize (if applicable)
            </label>
          </div>

          {/* upload image of product */}
          <div className="relative z-0 w-full mb-5 group flex flex-col-reverse">
            <input
              name="componentImageUrl"
              className="peer pb-1 pt-2 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800 indent-2"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              accept="image/*" //only images allowed here
              onChange={handleImageChange}
            />
            <label
              className="text-gray-500 font-medium text-md peer-focus:text-gray-300 "
              htmlFor="user_avatar"
            >
              Upload file
            </label>
          </div>
          {/* uploaded image preview */}
          {file && (
            <div className=" flex justify-center">
              <img
                src={imagePreview}
                alt="uploaded image"
                width="50%"
                className="rounded-md mb-2 mix-blend-screen"
              />
              {/* <div className="w-full text-slate-300 text-2xl flex h-full justify-center items-center">
                {(file.size / 1024).toFixed(2)}Kb
              </div> */}
            </div>
          )}

          {/*project Description  */}
          <div className="w-full flex flex-col-reverse ">
            <textarea
              rows={2}
              name="componentDescription"
              value={formData.componentDescription}
              className="pb-1 pt-1 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: text-gray-200 dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none  focus:border-gray-800
                placeholder-gray-600 indent-2 peer custom-scrollbar"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              // required
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
              disabled={isLoading}
            >
              {!isLoading ? "Submit" : "Uploding..."}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InventoryReg;
