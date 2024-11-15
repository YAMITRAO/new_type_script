const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProjectModel = require("../models/Projects");

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
      const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 });
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

    // check is user prev reg or not
    if (user.isProjectRegistered) {
      throw new Error("Already registered.");
    }

    console.log("Project is not registered ...hence ...");
    // add project to user
    const addProject = await new ProjectModel({
      ...req?.body,
      owner: user._id,
    });

    // update isProjectRegistered to true
    user.isProjectRegistered = true;
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

const userGetSingleProjectController = async (req, res) => {
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
    // console.log("User id is :- ", userId);

    // find project related to user
    // let project = await ProjectModel.find({ owner: userId });
    console.log(
      "Role of the user is :=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-",
      user.role
    );
    let project =
      user.role == "admin"
        ? await ProjectModel.find({})
        : await ProjectModel.find({ owner: userId });
    if (!project.length) {
      throw new Error("Project not found");
    }

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

module.exports = {
  userSignUpController,
  userLoginController,
  userAddProjectController,
  userGetController,
  userGetSingleProjectController,
};
