const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
 name :{
  type: String,
 },
 description :{
  type: String,
 },
 status :{
  type: String,
  enum: ['Not Started','In Progress','Completed'],
 },
 clientId: {
 type : mongoose.Schema.Types.ObjectId,
 ref:'Client',
 },
});

module.exports = mongoose.model('Project', ProjectSchema);

// require in the mongoose module from the library
// create a new schema called ClientSchema
// ClientSchema is a mongoose.schema object 
// Project has a name of type string
// Project has an description of type string
// Project has a status of type string & array of options for the status
// Project has a clientId of type mongoose.Schema.Types.ObjectId 
// Client  references the Client model from demo/server/models/Client.js
// the module.exports line exports the ClientSchema object as a module