const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema(
  {
    // quantity: { type: Number, required: true },
    // isAssigned: { type: Boolean, default: false },
    // assignmentStatus: { type: String, default: "Not Assigned" },
    // assignedBy: { type: String, default: null },
    componentTitle: { type: String, default: null },
    componentId: { type: String, default: null },
    componentImageUrl: { type: String, default: null },
    componentStatus: { type: String, default: null },
    selectedQuantity: { type: String, default: null },
    allocatedQuantity: { type: String, default: null },
    availableQuantity: { type: String, default: null },
  },
  { timestamps: true }
);

const projectRequirementSchema = new mongoose.Schema(
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
    requirementOnCreation: {
      type: mongoose.Schema.Types.Mixed, //requirement on creation of project put all
      default: {},
    },
    requirementAddFromInventory: {
      type: Map,
      of: componentSchema,
      required: false,
    },
    // requirementAddFromInventory: {
    //   type: {},
    //   required: false,
    // },
  },
  { timestamps: true }
);

const ProjectRequirementModel = mongoose.model(
  "ProjectRequirement",
  projectRequirementSchema
);

module.exports = ProjectRequirementModel;

// refrence example here

//creation of model
/*
const mongoose = require('mongoose');

// Define the schema for each component (requirement)
const componentSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  isAssigned: { type: Boolean, default: false },
  assignedBy: { type: String, default: null }
});

// Define the main project schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  requirements: {
    type: Map,
    of: componentSchema,  // Each component (e.g., 'comp1', 'comp2') will be mapped to a component schema
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

*/

//inseration of data
/*
const projectData = {
  title: "Hello India or any things else",
  requirements: {
    comp1: { quantity: 20, isAvailable: true, isAssigned: false, assignedBy: null },
    comp2: { quantity: 15, isAvailable: false, isAssigned: true, assignedBy: 'John Doe' },
    comp3: { quantity: 30, isAvailable: true, isAssigned: true, assignedBy: 'Jane Doe' }
  }
};

const newProject = new Project(projectData);

newProject.save()
  .then(result => console.log('Project Saved:', result))
  .catch(err => console.log('Error:', err));

*/

//quering of data
/*
Project.findOne({ title: "Hello India or any things else" })
  .then(result => console.log('Retrieved Project:', result))
  .catch(err => console.log('Error:', err));
 */

//output of data
/*
  {
  "_id": "60f5c0a5f1d52f3d75f4b0a2",
  "title": "Hello India or any things else",
  "requirements": {
    "comp1": {
      "quantity": 20,
      "isAvailable": true,
      "isAssigned": false,
      "assignedBy": null
    },
    "comp2": {
      "quantity": 15,
      "isAvailable": false,
      "isAssigned": true,
      "assignedBy": "John Doe"
    },
    "comp3": {
      "quantity": 30,
      "isAvailable": true,
      "isAssigned": true,
      "assignedBy": "Jane Doe"
    }
  },
  "createdAt": "2024-11-22T00:00:00.000Z",
  "updatedAt": "2024-11-22T00:00:00.000Z"
}
 */
