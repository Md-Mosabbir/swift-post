const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storyline = require("../models/storylines")
const Timelog = require("../models/timeLogs")

exports.get_timelogs = asyncHandler(async (req, res) => {
  const id = req.user.id
  const user = await User.findById(id)
  const timelogs = await Timelog.find().populate("user").populate("storylines")

  res.render("explore", { timelogs, user })
})
