const express = require("express");
const {
  userSignUpController,
  userLoginController,
  userAddProjectController,
  userGetController,
  userGetSingleProjectController,
  getAllUsersController,
  deleteUserController,
  blockUserController,
  unblockUserController,
  editUserController,
  getSingleUserAllDetailsController,
} = require("../controller/User");
const Auth = require("../middleware/Auth");

const userRouter = express.Router();

// auth routes
userRouter.post("/signup", userSignUpController);
userRouter.post("/login", userLoginController);

// get users
userRouter.get("/me", Auth, userGetController);
userRouter.get("/get-all-users", Auth, getAllUsersController);
userRouter.get(
  "/single-user-all-details/:userId",
  Auth,
  getSingleUserAllDetailsController
);
// userRouter.get("/get-all-users", getAllUsersController);

// delete user
userRouter.post("/delete-user/:userId", Auth, deleteUserController);
// block user
userRouter.post("/block-user/:userId", Auth, blockUserController);
// unblock user
userRouter.post("/unblock-user/:userId", Auth, unblockUserController);
// edit user
userRouter.post("/edit-user/:userId", Auth, editUserController);

// add_project
userRouter.post("/add-project", Auth, userAddProjectController);

// get single project
userRouter.get("/get-first-project", Auth, userGetSingleProjectController);

module.exports = userRouter;
