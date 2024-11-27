const express = require("express");
const Auth = require("../middleware/Auth");
const {
  addCompToInventoryController,
  getAllComponentController,
} = require("../controller/Inventory");

const inventoryRoutes = express.Router();

// add component to inventory
inventoryRoutes.post("/add-to-inventory", Auth, addCompToInventoryController);

// get all component from inventory
inventoryRoutes.get("/get-all-compo", Auth, getAllComponentController);

module.exports = inventoryRoutes;
