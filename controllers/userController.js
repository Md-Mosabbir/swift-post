const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storyline = require("../models/storylines")
const Timelog = require("../models/timeLogs")

exports.get_user = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const profileId = req.user.id

  const user = await User.findById(userId).populate({
    path: "storylines",
    populate: {
      path: "timeLogs",
    },
  })
  if (!user) {
    res.send("User not found").status(404)
  }

  if (userId === profileId) {
    res.redirect("/profile")
  } else {
    res.render("users", { user })
  }
})

exports.get_storyline = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const storylineId = req.params.storylineId
  const profileId = req.user.id

  const user = await User.findById(userId).populate({
    path: "storylines",
    populate: {
      path: "timeLogs",
    },
  })

  // Find the specific storyline within the user's storylines
  const storyline = user.storylines.find((story) => story._id == storylineId)

  if (!storyline) {
    // Handle the case where the storyline with the given ID is not found
    return res.status(404).send("Storyline not found")
  }

  if (storyline.user._id.toString() === profileId) {
    res.redirect(`/storyline/${storylineId}`)
  } else {
    res.render("userStoryline", { storyline })
  }
})
