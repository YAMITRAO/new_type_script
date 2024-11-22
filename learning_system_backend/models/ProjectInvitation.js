const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    invitationMail: { type: String, required: true, default: null },
    isInvitationAccepted: { type: Boolean, required: false, default: false },
    isInvitationRejected: { type: Boolean, required: false, default: false },
    invitationAcceptedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const projectInvitationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, //created by user (project creator)
      ref: "UserModel",
      required: true,
    },
    projectRefrence: {
      type: mongoose.Schema.Types.ObjectId, //project that has these requirement
      ref: "ProjectModel",
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
