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
  editProjectApprovalStatusController,
  userGetAllProjectController,
  editProjectDetailsController,
  findSearchedMailForInvitationController,
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

// find user for project invitation
userRouter.post(
  "/find-invitation-mail",
  Auth,
  findSearchedMailForInvitationController
);

// add_project
userRouter.post("/add-project", Auth, userAddProjectController);

// get all project data
userRouter.get("/get-all-projects", Auth, userGetAllProjectController);
// get single project data
userRouter.get(
  "/get-single-project/:projectId",
  Auth,
  userGetSingleProjectController
);
// edit project approval status
userRouter.patch(
  "/approve-as-success/:projectId",
  Auth,
  editProjectApprovalStatusController
);

// edit project details
userRouter.put(
  "/edit-project-details/:projectId",
  Auth,
  editProjectDetailsController
);

module.exports = userRouter;
