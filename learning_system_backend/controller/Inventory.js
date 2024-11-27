const LabInventoryModel = require("../models/Inventory");
const UserModel = require("../models/User");

const addCompToInventoryController = async (req, res) => {
  try {
    // check is user admin or not (allowed only admin to add product)
    const userMail = req?.userMail;
    console.log("usermail id is", userMail);

    const user = await UserModel.findOne({ email: userMail });
    if (!user) {
      throw new Error("Admin not found");
    }
    if (user.role !== "admin") {
      throw new Error("You are not an admin");
    }

    // check if product already exists in inventory
    const product = await LabInventoryModel.findOne({
      componentTitle: req.body.componentTitle,
    });

    if (product) {
      throw new Error("Product already exists in inventory");
    }

    const {
      componentTitle,
      availableQuantity,
      allocatedQuantity,
      refrenceLink1,
      refrenceLink2,
      approxAmount,
      componentImageUrl,
      componentDescription,
    } = req?.body;

    let newInventoryItem = await new LabInventoryModel({
      componentTitle: componentTitle.toLowerCase(),
      availableQuantity,
      allocatedQuantity,
      refrenceLink1,
      refrenceLink2,
      approxAmount,
      componentImageUrl,
      componentDescription,
    });
    newInventoryItem.save();

    res.status(200).json({
      message: "Component added to inventory successfully",
      data: newInventoryItem,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// get all component
const getAllComponentController = async (req, res) => {
  try {
    const allComponent = await LabInventoryModel.find({});
    res.status(200).json({
      message: "components get successfully",
      data: allComponent,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

module.exports = {
  addCompToInventoryController,
  getAllComponentController,
};
