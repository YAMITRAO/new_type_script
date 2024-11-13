const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    },
  });
};

const userLoginController = async (req, res) => {
  const { email, password } = req?.body;

  console.log("Login request", req?.body);
  console.log("Request header", req.headers["authorization"]?.split(" ")[1]);

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
      const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 1 });
      console.log("generated token is :- ", token);

      // if password is correct, return user data
      res.status(200).json({
        message: "Loging Success!",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isProjectRegistered: user.isProjectRegistered,
          token: token,
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
  console.log("Data at auth is ", req.userEmail);
  try {
  } catch (error) {}
};

module.exports = {
  userSignUpController,
  userLoginController,
  userAddProjectController,
  userGetController,
};
