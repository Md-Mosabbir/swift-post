const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storyline = require("../models/storylines")
const Timelog = require("../models/timeLogs")

// CRUD storylines

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

  const updatedStoryline = await Storyline.findByIdAndUpdate(
    storyId,
    { title: title },
    { new: true },
  )

  res.redirect("/profile")
})

exports.delete_storyline = asyncHandler(async (req, res) => {
  const storyId = req.params.storylineId

  // Delete timeLogs associated with the storyline
  await Timelog.deleteMany({ storylines: storyId })

  // Delete the storyline itself
  await Storyline.findByIdAndDelete(storyId)

  res.redirect("/profile")
})

// CRUD timelogs

exports.get_timeLogs = asyncHandler(async (req, res) => {
  const timeLogId = req.params.timeLogId

  // Find the timeLog
  const timeLog = await Timelog.findById(timeLogId)

  // Render your response or send it as JSON
  res.render("showTimeLog", { timeLog, id: timeLogId })
})

exports.update_timeLog = asyncHandler(async (req, res) => {
  const timeLogId = req.params.timeLogId
  const timeLogEdit = req.body.editTimeLog

  // Find the timeLog
  const updatedTimelog = await Timelog.findByIdAndUpdate(
    timeLogId,
    { post: timeLogEdit },
    { new: true },
  )

  res.redirect("/profile")
})

exports.delete_timeLog = asyncHandler(async (req, res) => {
  const timeLogId = req.params.timeLogId

  // Delete the storyline itself
  await Timelog.findByIdAndDelete(timeLogId)

  res.redirect("/profile")
})
