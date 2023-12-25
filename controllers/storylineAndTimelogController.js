const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storyline = require("../models/storylines")
const Timelog = require("../models/timeLogs")

exports.get_storylines = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const id = req.params.storylineId

  const user = await User.findById(userId).populate({
    path: "storylines",
    populate: {
      path: "timeLogs",
    },
  })

  // Find the specific storyline within the user's storylines
  const storyline = user.storylines.find((story) => story._id == id)

  if (!storyline) {
    // Handle the case where the storyline with the given ID is not found
    return res.status(404).send("Storyline not found")
  }

  // Render the corresponding view or send data as needed
  res.render("show", { storyline, id })
})

exports.update_storyline = asyncHandler(async (req, res) => {
  const storyId = req.params.storylineId
  const title = req.body.editStorylineName

  console.log("Story ID:", storyId)
  console.log("New Title:", title)

  const updatedStoryline = await Storyline.findByIdAndUpdate(
    storyId,
    { title: title },
    { new: true },
  )

  console.log("Updated Storyline:", updatedStoryline)

  res.redirect("/")
})

exports.delete_storyline = asyncHandler(async (req, res) => {
  const storyId = req.params.storylineId
  await Storyline.findByIdAndDelete(storyId)

  res.redirect("/")
})
