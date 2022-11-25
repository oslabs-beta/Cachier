
//require ('dotenv').config()
const mongoose = require ('mongoose');
const connectDB = async () => {
 const conn = await mongoose.connect (process.env.MONGO_URI);
 console.log (`DB connected `)
}
module.exports = connectDB
// require the mongoose model mongoose library
// create an async function called ConnectDB
// when ConnectDB is invoked it returns a promise
// the promise is assigned to the variable conn
// log the connection to the console "DB connected"
// export the ConnectDB function
