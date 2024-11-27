require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // replace with your frontend URL
  credentials: true, // Allow sending cookies
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// user url filter
app.use("/user", require("./routes/User"));
app.use("/inventory", require("./routes/Inventory"));

mongoose
  .connect(process.env.MONGOEDB_CONNECTION_STRING)
  .then(() => {
    console.log("DB connected..");
    app.listen(PORT, () => {
      console.log("Server is running at ", PORT);
    });
  })
  .catch((err) => console.log("Error during db connection"));
