const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      required: true,
    },
    email: {
      type: String,
      default: null,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      default: null,
      required: true,
    },

    password: {
      type: String,
      default: null,
      required: true,
    },

    isProjectRegistered: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
