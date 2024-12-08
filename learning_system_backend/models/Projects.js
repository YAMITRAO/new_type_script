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

    // step one: approval
    approvalStatus: {
      type: String,
      default: "pending", // pending, accepted, rejected
    },

    isEditAllowed: {
      type: Boolean,
      default: false,
    },

    // step two: component selection
    isComponentSelectionAllowed: {
      type: Boolean,
      default: false,
    },
    projectResources: {
      type: {},
      default: {},
    },
    projectRequirement: {
      // different schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectRequirement",
    },
    // projectOtherFields: {
    //   // different schema
    // },
    projectInvitations: {
      // different schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "projectInvitation",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projects", projectSchema);

module.exports = ProjectModel;
