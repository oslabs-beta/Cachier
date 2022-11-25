const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model('Client', ClientSchema);
// require in the mongoose module from the library
// create a new schema called ClientSchema
// ClientSchema is a mongoose.schema object 
// Client has a name of type string
// Client has an email of type string
// Client has a phone of type string
// the module.exports line exports the ClientSchema object as a module