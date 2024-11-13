const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("The token is", token);
  if (!token) {
    return "";
  }

  try {
    // verify token and decode it
    const SECRET_KEY = "fjklsdhkghkjhdfgfgjkdhgdk";
    const decode = jwt.verify(token, SECRET_KEY);
    console.log("Decoded value is :- ", decode);
    req.userMail = decode.email;
    next();
  } catch (error) {
    // console.log("Error occured", error && error?.name);
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ message: "Token has expired" });
    } else {
      res.status(400).json({ message: "Invalid token" });
    }
  }
};

module.exports = Auth;
