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

    userClass: {
      type: String,
      default: null,
    },

    userSec: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      default: "student",
    },

    isProjectRegistered: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    editedBy: {
      type: String,
      default: null,
    },
    editedAt: {
      type: Date,
      default: null,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    blockedBy: {
      type: String,
      default: null,
    },
    blockedAt: {
      type: Date,
      default: null,
    },
    blockedReason: {
      type: String,
      default: null,
    },

    unblockedBy: {
      type: String,
      default: null,
    },
    unblockedAt: {
      type: Date,
      default: null,
    },
    unblockedReason: {
      type: String,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      type: String,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
