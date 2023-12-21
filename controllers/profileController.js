const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const storylines = require("../models/storylines")
const timeLogs = require("../models/timeLogs")

exports.get_storylines_and_timelogs = asyncHandler(async (req, res) => {
  // Fetch the logged-in user's information
  const user = await User.findById(req.user.id).populate({
    path: "storylines",
    populate: {
      path: "timeLogs",
    },
  })

  // Render the EJS template and pass user data
  res.render("profile", { user })
})
