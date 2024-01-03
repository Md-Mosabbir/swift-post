const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  profileImage: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  storylines: [{ type: mongoose.Schema.Types.ObjectId, ref: "storylines" }],
})

module.exports = mongoose.model("users", userSchema)
