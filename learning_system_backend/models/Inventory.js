const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    componentTitle: {
      type: String,
      required: true,
    },
    availableQuantity: {
      type: String,
      required: true,
    },
    allocatedQuantity: {
      type: String,
      required: true,
    },
    refrenceLink1: {
      type: String,
      default: "none",
    },
    refrenceLink2: {
      type: String,
      default: "none",
    },
    approxAmount: {
      type: String,
      default: "none",
    },
    componentImageUrl: {
      type: String,
      default: "none",
    },
    componentDescription: {
      type: String,
      default: "none",
    },
  },
  { timestamps: true }
);

const LabInventoryModel = mongoose.model("Labinventory", inventorySchema);

module.exports = LabInventoryModel;
