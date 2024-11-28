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
    isAllowedToSelect: {
      type: Boolean,
      default: true,
    },
    isCostly: {
      type: Boolean,
      default: false,
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
    otherFieldsForFuture: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const LabInventoryModel = mongoose.model("Labinventory", inventorySchema);

module.exports = LabInventoryModel;
