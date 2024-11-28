const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProjectModel = require("../models/Projects");
const ProjectRequirementModel = require("../models/ProjectRequirements");
const ProjectInvitationModel = require("../models/ProjectInvitation");

// signup controller
const userSignUpController = async (req, res) => {
  console.log("User signUp request...", req.body);

  let { name, email, dob, password, confirmPassword } = req?.body;

  if (password !== confirmPassword) {
    console.log("Password is not same here....");
    throw new Error("Password and Confirm Password must be same");
  } else if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  } else if (new Date(dob) > new Date()) {
    throw new Error("Date of birth must be in the past");
  }

  try {
    // check email exist or not
    const userExist = await UserModel.findOne({ email });
    console.log("isUserExist..", userExist);
    if (userExist) {
      throw new Error("Email already exists. Try Using other mail id.");
    }

    let hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await new UserModel({
      name,
      email,
      dob,
      password: hasedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      message: "User Successfully Signed Up!",
      data: newUser,
    });
  } catch (error) {
    console.log(error && error.message);
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// get user based on auth token
const userGetController = async (req, res) => {
  const user = await UserModel.findOne({ email: req.userMail });
  res.status(200).json({
    message: "User Login through token",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isProjectRegistered: user.isProjectRegistered,
      role: user.role,
    },
  });
};

const userLoginController = async (req, res) => {
  const { email, password } = req?.body;

  // console.log("Login request", req?.body);
  // console.log("Request header", req.headers["authorization"]?.split(" ")[1]);
  console.log("cookie from the back end is:-", req.cookies);

  try {
    // find existing user
    const user = await UserModel.findOne({ email });
    console.log("isUserFound ", user);
    if (!user) {
      throw new Error("Email doesn't exist");
    } else {
      // check hashed password
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      console.log("Password after hashing is :-", isPasswordMatched);
      if (!isPasswordMatched) {
        throw new Error("Enter Correct Passowrd");
      }

      // generate a token
      let payload = {
        email: email,
      };
      const SECRET_KEY = "fjklsdhkghkjhdfgfgjkdhgdk";
      const token = await jwt.sign(payload, SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      console.log("generated token is :- ", token);

      // if password is correct, return user data
      console.log("Cookies sent to frontend");
      res.status(200).json({
        message: "Loging Success!",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isProjectRegistered: user.isProjectRegistered,
          token: token,
          role: user.role,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

const getAllUsersController = async (req, res) => {
  // ========================testing purpose only
  // const allUsers = await UserModel.find({ role: { $ne: "admin" } });
  // res.status(200).json({
  //   message: "All users found",
  //   data: allUsers,
  // });
  // return;
  // ========================testing purpose only

  try {
    const userEmail = req?.userMail;
    console.log("User email id after auth is :-", userEmail);

    // find user using email id:-
    const user = await UserModel.findOne({ email: userEmail });

    console.log("User founded and that is", user);
    if (!user) {
      throw new Error("User not found");
    }
    if (user?.role == "admin") {
      const allUsers = await UserModel.find({
        role: { $ne: "admin" },
        isDeleted: { $ne: true },
      });
      res.status(200).json({
        message: "All users found",
        data: allUsers,
      });
    } else {
      throw new Error("You are not an admin");
    }
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

const getSingleUserAllDetailsController = async (req, res) => {
  const userMail = req?.userMail; //from auth
  const userId = req.params.userId; //from api

  try {
    let user = await UserModel.findById(userId);
    let admin = await UserModel.findOne({ email: userMail });

    console.log("mail by userId param", user.email);
    console.log("admin mail by userMail from auth", admin.email);

    if (!user) {
      throw new Error("User not found");
    }
    if (admin.email !== user.email && admin.role !== "admin") {
      throw new Error("Unwanted access is not allowed");
    }

    // project data of user is
    const userProjectData = await ProjectModel.find({ owner: userId });
    let data = {
      userDetails: user,
      projectDetails: userProjectData,
    };

    res.status(200).json({
      message: "User details found",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// delete user
const deleteUserController = async (req, res) => {
  const userEmail = req?.userMail;
  const deleteUserId = req.params.userId;

  try {
    const admin = await UserModel.findOne({ email: userEmail });

    console.log("Admin founded and that is", admin);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (admin?.role == "admin") {
      const deleteUser = await UserModel.findById(deleteUserId);
      if (!deleteUser) {
        throw new Error("User not found");
      }
      deleteUser.isDeleted = true;
      deleteUser.deletedBy = userEmail;
      deleteUser.deletedAt = new Date();
      deleteUser.deletedReason = "Deleted By Admin";
      await deleteUser.save();
      res.status(200).json({
        message: "User deleted successfully",
        data: deleteUser,
      });
    } else {
      throw new Error("You are not an admin");
    }
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// block user
const blockUserController = async (req, res) => {
  const userEmail = req?.userMail;
  const blockUserId = req.params.userId;

  console.log("Blocked user id is", blockUserId);
  console.log("Admin id is ", userEmail);

  try {
    const admin = await UserModel.findOne({ email: userEmail });

    console.log("Admin founded and that is", admin);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (admin?.role == "admin") {
      const blockedUser = await UserModel.findById(blockUserId);
      if (!blockedUser) {
        throw new Error("User not found");
      }
      blockedUser.isBlocked = true;
      blockedUser.blockedBy = userEmail;
      blockedUser.blockedAt = new Date();
      blockedUser.blockedReason = "Blocked By Admin";

      await blockedUser.save();
      res.status(200).json({
        message: "User Blocked successfully",
        data: blockedUser,
      });
    } else {
      throw new Error("You are not an admin");
    }
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// unblock user
const unblockUserController = async (req, res) => {
  const userEmail = req?.userMail;
  const blockUserId = req.params.userId;

  console.log("UnBlocked user id is", blockUserId);
  console.log("Admin id is ", userEmail);

  try {
    const admin = await UserModel.findOne({ email: userEmail });

    console.log("Admin founded and that is", admin);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (admin?.role == "admin") {
      const unblockedUser = await UserModel.findById(blockUserId);
      if (!unblockedUser) {
        throw new Error("User not found");
      }
      unblockedUser.isBlocked = false;
      unblockedUser.unblockedBy = userEmail;
      unblockedUser.unblockedAt = new Date();
      unblockedUser.unblockedReason = "UnBlocked By Admin";

      await unblockedUser.save();
      res.status(200).json({
        message: "User UnBlocked successfully",
        data: unblockedUser,
      });
    } else {
      throw new Error("You are not an admin");
    }
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// edit user
const editUserController = async (req, res) => {
  const userEmail = req?.userMail;
  const editUserId = req.params.userId;
  const { name, email, dob, userClass, userSec } = req?.body;

  console.log("UnBlocked user id is", editUserId);
  console.log("Admin id is ", userEmail);

  try {
    const admin = await UserModel.findOne({ email: userEmail });

    console.log("Admin founded and that is", admin);
    if (!admin) {
      throw new Error("Admin not found");
    }
    if (admin?.role == "admin") {
      const editedUser = await UserModel.findById(editUserId);
      if (!editedUser) {
        throw new Error("User not found");
      }

      if (editedUser.email !== email) {
        throw new Error("Email can't be changed");
      }
      editedUser.name = name && name;
      editedUser.email = email && email;
      editedUser.dob = dob && dob;
      editedUser.userClass = userClass && userClass;
      editedUser.userSec = userSec && userSec;
      editedUser.editedBy = userEmail;
      editedUser.editedAt = new Date();

      await editedUser.save();
      res.status(200).json({
        message: "User Edited successfully",
        data: editedUser,
      });
    } else {
      throw new Error("You are not an admin");
    }
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// find searched mail for invitation
const findSearchedMailForInvitationController = async (req, res) => {
  // console.log(req.body.email);
  try {
    let searchedMail = req?.body?.email;
    if (searchedMail.toLowerCase() === req?.userMail.toLowerCase()) {
      throw new Error("You can't invite yourself");
    }
    const findUser = await UserModel.findOne({ email: searchedMail });
    console.log("User value is ", findUser);
    if (!findUser) {
      throw new Error("User not found");
    }
    res.status(200).json({
      message: "Email found",
      data: {
        name: findUser.name,
        searchedMail: searchedMail,
        searchstatus: "Founded",
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// invite user for project collab
const inviteUserController = async (req, res) => {
  try {
    const projectId = req?.body?.projectId;
    const searchedMail = req?.body?.email;
    const searchedUser = req?.body?.userName;
    const invitationDocId = req?.body?.invitationDocId;

    console.log("Project id is:-", projectId);
    console.log("searched mail is:-", searchedMail);
    console.log("Invitation doc id", invitationDocId);

    // check is mail exist in db

    if (searchedMail.toLowerCase() === req?.userMail.toLowerCase()) {
      throw new Error("You can't invite yourself");
    }
    const findUser = await UserModel.findOne({ email: searchedMail });
    console.log("User value is ", findUser);
    if (!findUser) {
      throw new Error("Email not found");
    }

    // let count invitation
    const projectInvitation = await ProjectInvitationModel.findOne({
      projectRefrence: projectId,
    });

    const invitedUsersCount = projectInvitation.invitedUsers.size;
    console.log("Total invited users are :-", invitedUsersCount);
    if (invitedUsersCount >= 4) {
      throw new Error("Maximum 4 users can be invited");
    }

    // extrac the id before @
    let username = searchedMail.split("@")[0];

    // check for reinvitation

    const checkInvitation = await ProjectInvitationModel.find({
      _id: invitationDocId,
      [`invitedUsers.${username}.invitationMail`]: searchedMail,
    });

    if (checkInvitation.length) {
      throw new Error("Already invited");
    }
    // find project
    await ProjectInvitationModel.findOneAndUpdate(
      { projectRefrence: projectId },
      {
        $set: {
          [`invitedUsers.${username}`]: {
            invitationMail: searchedMail,
            invitedUserName: searchedUser,
          },
        },
      }
    );

    // count douments

    res.json({
      message: "Invitation sent successfully",
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// get project invitation
const getProjectsInvitationController = async (req, res) => {
  try {
    // serach invitation for which user
    const userMail = req?.userMail;
    console.log("Get invitation for", userMail);

    let username = userMail.split("@")[0];
    const checkInvitation = await ProjectInvitationModel.find({
      [`invitedUsers.${username}.invitationMail`]: userMail,
      [`invitedUsers.${username}.invitationStatus`]: "pending",
    })
      .populate("createdBy", "name email userClass userSec")
      .populate("projectRefrence", "projectTitle");

    console.log("Get invitation for", checkInvitation);
    res.json({
      message: "You have same invitations here",
      data: checkInvitation,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// update project invitation status
const updateProjectInvitationStatusController = async (req, res) => {
  try {
    // USER MAIL ID
    const userMail = req?.userMail;
    const invitationDocId = req?.body?.invitationDocId;
    const status = req?.body?.status.toLowerCase();

    console.log("The data is as", userMail, invitationDocId, status);
    let username = userMail.split("@")[0];

    await ProjectInvitationModel.findOneAndUpdate(
      { _id: invitationDocId },
      {
        $set: {
          [`invitedUsers.${username}.invitationStatus`]: status,
        },
      }
    );
    res.json({
      message: "Invitation Status updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// project model realted routes
const userAddProjectController = async (req, res) => {
  console.log("Data at body is:- ", req?.body);
  console.log("Data at auth is ", req.userMail);

  try {
    // check user exist
    const user = await UserModel.findOne({ email: req.userMail });
    console.log("User founded");
    if (!user) {
      throw new Error("User doesn't exist");
    }

    // add project to user
    const addProject = await new ProjectModel({
      createdBy: user._id,
      projectTitle: req?.body.projectTitle,
      projectDescription: req?.body.projectDesc,
      projectResources: req?.body?.projectResources,
    });
    await addProject.save();
    await user.save();

    // check if body has data of requirement
    if (req?.body?.requirement) {
      const addRequirement = await new ProjectRequirementModel({
        createdBy: user._id,
        projectRefrence: addProject._id,
        requirementOnCreation: req?.body?.requirement,
      });
      await addRequirement.save();
      // add requirement id to the project collection
      addProject.projectRequirement = addRequirement._id;
    }

    // check if invitation is the body
    if (req?.body?.invitation) {
      console.log("Invitation fields also here");
      const addInvitation = await new ProjectInvitationModel({
        createdBy: user._id,
        projectRefrence: addProject._id,
        invitedUsers: req?.body?.invitation,
      });
      await addInvitation.save();
      // add projectInivtations ref id to project collection
      addProject.projectInvitations = addInvitation._id;
    }

    await addProject.save();
    await user.save();

    res.status(200).json({
      message: "Project Registered Successfully",
      data: addProject,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// get single Project
const userGetSingleProjectController = async (req, res) => {
  const userEmail = req?.userMail;
  const projectId = req?.params.projectId;
  console.log("Project id is:- ", projectId);
  console.log("User email is:-", userEmail);
  try {
    // find user using email id:-
    const user = await UserModel.findOne({ email: userEmail });
    // console.log("User founded and that is", user);
    if (!user) {
      throw new Error("User not found");
    }
    const userId = user._id;
    console.log("User id is :- ", userId);

    // find project related to user
    // let project = await ProjectModel.find({ owner: userId });
    console.log(
      "Role of the user is :=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-",
      user.role
    );
    let project =
      user.role == "admin"
        ? await ProjectModel.findOne({ _id: projectId })
            .populate("createdBy", "name email userClass userSec")
            .populate("projectRequirement", "requirementOnCreation")
            .populate("projectInvitations", "invitedUsers")
        : await ProjectModel.findOne({ _id: projectId })
            .populate("createdBy", "name email userClass userSec")
            .populate("projectRequirement", "requirementOnCreation")
            .populate("projectInvitations", "invitedUsers");
    // if (!project.length) {
    //   throw new Error("Project not found");
    // }

    res.status(200).json({
      message: "Project found",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// get all project
const userGetAllProjectController = async (req, res) => {
  const userEmail = req?.userMail;
  console.log("User email is:-", userEmail);
  try {
    // find user using email id:-
    const user = await UserModel.findOne({ email: userEmail });
    // console.log("User founded and that is", user);
    if (!user) {
      throw new Error("User not found");
    }
    const userId = user._id;
    console.log("User id is :- ", userId);

    // find project related to user
    // let project = await ProjectModel.find({ owner: userId });
    // console.log(
    //   "Role of the user is :=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-",
    //   user.role
    // );
    let project =
      user.role == "admin"
        ? await ProjectModel.find({}).populate(
            "createdBy",
            "name email userClass userSec"
          )
        : await ProjectModel.find({ createdBy: userId }).populate(
            "createdBy",
            "name email userClass userSec"
          );
    // if (!project.length) {
    //   throw new Error("Project not found");
    // }

    res.status(200).json({
      message: "Project found",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

// get invited project
const userGetInvitedProjectController = async (req, res) => {
  try {
    const userMail = req?.userMail;
    console.log("Get project for", userMail);

    // block admin to get project agian because in allproject admin have access of all projects?

    // commenting because now admin can also get project invitation after blocking it we open it

    // const user = await UserModel.findOne({ email: userMail });
    // if (user.role === "admin") {
    //   throw new Error(
    //     "Admin can't get project, because they are just the copy"
    //   );
    // }

    let username = userMail.split("@")[0];
    const getInvitedProjects = await ProjectInvitationModel.find({
      [`invitedUsers.${username}.invitationMail`]: userMail,
      [`invitedUsers.${username}.invitationStatus`]: "accepted",
    })
      .populate("createdBy", "name email userClass userSec")
      .populate(
        "projectRefrence",
        "projectTitle projectDescription approvalStatus"
      );

    console.log("Get invitation for", getInvitedProjects);

    res.json({
      message: "Invited project found",
      data: getInvitedProjects,
    });
  } catch (error) {
    res.status(400).json({ message: error && error.message });
  }
};

const editProjectApprovalStatusController = async (req, res) => {
  try {
    const projectId = req?.params?.projectId;
    const adminMain = req?.userMail;
    const approvalStatus = req?.body?.approvalStatus;
    console.log("admin mail id :- ", adminMain);
    console.log("project id ", projectId);
    console.log("Approval status is:-", approvalStatus);

    // find user to check for admin
    const admin = await UserModel.findOne({ email: adminMain });

    console.log("Admin founded and that is", admin);
    if (!admin) {
      throw new Error("Admin not found");
    }

    if (admin?.role !== "admin") {
      throw new Error("Only admin can edit project");
    }
    const editProject = await ProjectModel.findById(projectId);
    if (!editProject) {
      throw new Error("Project Not found");
    }
    if (
      editProject.approvalStatus === "rejected" &&
      approvalStatus === "success"
    ) {
      throw new Error("This Operation can't be allowed");
    }

    editProject.approvalStatus = approvalStatus;
    await editProject.save();

    res.status(200).json({
      message: "Project status updated successfully...",
      data: editProject,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

const editProjectDetailsController = async (req, res) => {
  try {
    const projectId = req?.params?.projectId;
    const adminMain = req?.userMail;
    const { projectTitle, projectDescription, projectResources, requirement } =
      req?.body;
    console.log("admin mail id :- ", adminMain);
    console.log("project id ", projectId);
    console.log("Title and status is:-", projectTitle, projectDescription);

    // find user to check for admin
    const admin = await UserModel.findOne({ email: adminMain });

    console.log("Admin founded and that is", admin);
    if (!admin) {
      throw new Error("Admin not found");
    }

    if (admin?.role !== "admin") {
      throw new Error("Only admin can edit project");
    }
    const editProject = await ProjectModel.findById(projectId);
    if (!editProject) {
      throw new Error("Project Not found");
    }

    editProject.projectTitle = projectTitle;
    editProject.projectDescription = projectDescription;
    editProject.projectResources = projectResources;
    await editProject.save();

    // change to the requirement folder
    // const requirementFolder = await ProjectRequirementModel.find({
    //   projectRefrence: editProject._id,
    // });
    // requirementFolder.requirementOnCreation = requirement;
    // await requirementFolder.save();

    res.status(200).json({
      message: "Project edited successfully...",
      data: editProject,
    });
  } catch (error) {
    res.status(400).json({
      message: error && error.message,
    });
  }
};

module.exports = {
  userSignUpController,
  userLoginController,
  userAddProjectController,
  userGetController,
  findSearchedMailForInvitationController,
  inviteUserController,
  getProjectsInvitationController,
  updateProjectInvitationStatusController,
  userGetSingleProjectController,
  userGetAllProjectController,
  userGetInvitedProjectController,
  getAllUsersController,
  deleteUserController,
  blockUserController,
  unblockUserController,
  editUserController,
  getSingleUserAllDetailsController,
  editProjectApprovalStatusController,
  editProjectDetailsController,
};
