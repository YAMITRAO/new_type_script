const express = require("express");
const {
  userSignUpController,
  userLoginController,
  userAddProjectController,
  userGetController,
  userGetSingleProjectController,
  getAllUsersController,
  deleteUserController,
} = require("../controller/User");
const Auth = require("../middleware/Auth");

const userRouter = express.Router();

// auth routes
userRouter.post("/signup", userSignUpController);
userRouter.post("/login", userLoginController);

// get users
userRouter.get("/me", Auth, userGetController);
userRouter.get("/get-all-users", Auth, getAllUsersController);
// userRouter.get("/get-all-users", getAllUsersController);

// delete user
userRouter.delete("/delete-user/:userId", Auth, deleteUserController);

// add_project
userRouter.post("/add-project", Auth, userAddProjectController);

// get single project
userRouter.get("/get-first-project", Auth, userGetSingleProjectController);

module.exports = userRouter;
