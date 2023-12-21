// storyline.js
const mongoose = require("mongoose")

const storylineSchema = new mongoose.Schema({
  title: String,
  timeLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "timeLogs" }],
  createdDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model("storylines", storylineSchema)
