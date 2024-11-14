const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      default: null,
      required: true,
    },
    teamName: {
      type: String,
      default: "",
    },
    teamMembers: {
      type: String,
      default: "",
    },
    projectDescription: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projects", projectSchema);

module.exports = ProjectModel;
