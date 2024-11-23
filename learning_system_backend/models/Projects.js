const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    projectTitle: {
      type: String,
      default: null,
      required: true,
    },
    projectDescription: {
      type: String,
      default: "",
    },
    approvalStatus: {
      type: String,
      default: "pending", // pending, accepted, rejected
    },
    // projectRequirement: {
    //   // different schema
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ProjectRequirementModel",
    // },
    // projectOtherFields: {
    //   // different schema
    // },
    // projectInvitations: {
    //   // different schema
    // },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projects", projectSchema);

module.exports = ProjectModel;
