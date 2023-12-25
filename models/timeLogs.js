// timeLog.js
const mongoose = require("mongoose")

const timeLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  storylines: { type: mongoose.Schema.Types.ObjectId, ref: "storylines" },
  post: String,
  createdDate: { type: Date, default: Date.now },
})

const TimeLog = mongoose.model("timeLogs", timeLogSchema)

module.exports = TimeLog
