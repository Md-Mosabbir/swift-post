const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storyline = require("../models/storylines")
const timeLogs = require("../models/timeLogs")

exports.get_storylines_and_timelogs = asyncHandler(async (req, res) => {
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

exports.get_profile = asyncHandler(async (req, res) => {
  const userId = req.user.id

  //Find the user
  const user = await User.findById(userId)

  const username = user.first_name

  res.redirect(`/profile/${username.toLowerCase()}`)
})
