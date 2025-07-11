import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MONGODB CONNECTED SUCCESSFULLY!")
  } catch (error) {
    console.error("Error connecting to MONGODB ", error);
    process.exit(1); // exit with error
  }
}

// FOR MULTIPLE INDEPENDENT CONNECTIONS
// const noteDb = mongoose.createConnection(process.env.NOTE_DB_URI);
// const userDb = mongoose.createConnection(process.env.USER_DB_URI);

// module.exports = {
//   noteDb,
//   userDb,
// };

// CREATE ANOTHER MODEL SCHEMA
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
// });

// const User = userDb.model('User', userSchema);