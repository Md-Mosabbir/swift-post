// timeLog.js
const mongoose = require("mongoose")

const timeLogSchema = new mongoose.Schema({
  name: String,
  post: String,
  createdDate: { type: Date, default: Date.now },
})

const TimeLog = mongoose.model("timeLogs", timeLogSchema)

module.exports = TimeLog
