const mongoose = require("mongoose")

const Schema = mongoose.Schema

// user model

const userSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = mongoose.model("user", userSchema)
