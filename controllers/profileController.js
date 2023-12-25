const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storyline = require("../models/storylines")
const timeLogs = require("../models/timeLogs")

exports.get_storylines_and_timelogs = asyncHandler(async (req, res) => {
  // Get the username
  const username = req.params.username

  //Get the storylines and the first timelog
  const user = await User.findById(req.user.id).populate({
    path: "storylines",
    populate: {
      path: "timeLogs",
    },
  })

  // Render the EJS template and pass user data
  res.render("profile", { user })
})
