const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    invitedUserName: { type: String, default: null },
    invitationMail: { type: String, required: true, default: null },
    invitationStatus: { type: String, default: "pending" }, // pending, accepted, rejected
    invitationAcceptedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const projectInvitationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, //created by user (project creator)
      ref: "Users",
      required: true,
    },
    projectRefrence: {
      type: mongoose.Schema.Types.ObjectId, //project that has these requirement
      ref: "Projects",
    },
    invitedUsers: {
      type: Map,
      of: invitationSchema,
      required: false,
    },

    // invitedUsers: {
    //   type: mongoose.Schema.Types.Mixed,
    //   default: {},
    // },
  },
  { timestamps: true }
);

const ProjectInvitationModel = mongoose.model(
  "projectInvitation",
  projectInvitationSchema
);

module.exports = ProjectInvitationModel;
