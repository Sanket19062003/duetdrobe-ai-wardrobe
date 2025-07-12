// Import the mongoose library, which is used to interact with MongoDB databases in Node.js
const mongoose = require("mongoose");

// Define a new schema for the User collection using mongoose.Schema
// This schema outlines the structure of user documents in the database
const userSchema = new mongoose.Schema({
    // The 'name' field is of type String and is required (must be provided)
    name : { type: String, required: true},
    // The 'email' field is of type String, must be unique (no two users can have the same email), and is required
    email : { type: String, required: true, unique: true},
    // The 'password' field is of type String and is required (must be provided)
    password : { type: String, required: true},
}, 
// The second argument is an options object
// 'timestamps: true' automatically adds 'createdAt' and 'updatedAt' fields to each document
{timestamps: true}
);

// Export a Mongoose model named "User" based on the userSchema
// This model can be used to interact with the 'users' collection in MongoDB
module.exports = mongoose.model("User", userSchema);