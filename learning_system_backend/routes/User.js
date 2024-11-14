const express = require("express");
const {
  userSignUpController,
  userLoginController,
  userAddProjectController,
  userGetController,
  userGetSingleProjectController,
} = require("../controller/User");
const Auth = require("../middleware/Auth");

const userRouter = express.Router();

// auth routes
userRouter.post("/signup", userSignUpController);
userRouter.post("/login", userLoginController);
userRouter.get("/me", Auth, userGetController);

// add_project
userRouter.post("/add-project", Auth, userAddProjectController);

// get single project
userRouter.get("/get-first-project", Auth, userGetSingleProjectController);

module.exports = userRouter;
