require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: "https://new-type-script-81ra.vercel.app", // replace with your frontend URL
  credentials: true, // Allow sending cookies
};

app.use(cors());
app.use(cookieParser());

app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// user url filter
app.use("/user", require("./routes/User"));
app.use("/inventory", require("./routes/Inventory"));
app.use("/test", (req, res,next) => {
  res.send("<div>This is test api route</div>")
})

mongoose
  .connect(process.env.MONGOEDB_CONNECTION_STRING)
  .then(() => {
    console.log("DB connected..");
    app.listen(PORT, () => {
      console.log("Server is running at ", PORT);
    });
  })
  .catch((err) => console.log("Error during db connection"));
