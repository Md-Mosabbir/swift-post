const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storylines = require("../models/storylines")
const TimeLog = require("../models/timeLogs")
exports.get_storylines = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("storylines")

  res.render("create", { user })
})

exports.post_storyline = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("storylines")

  const storyline = new Storylines({
    user: req.user.id,
    title: req.body.titleStory,
    timeLogs: [],
  })

  const existingStoryline = user.storylines.find(
    (story) => story.title === req.body.titleStory,
  )

  if (existingStoryline) {
    req.flash("error_msg", "Story with this title already exists.")
    res.redirect("/create")
  }

  // Save the new Storyline
  await storyline.save()

  const firstTimeLog = new TimeLog({
    user: req.user.id,
    storylines: storyline._id,
    post: req.body.timelogStory,
  })
  await firstTimeLog.save()

  // Update the user's storylines array
  user.storylines.push(storyline)
  await user.save()

  // Push the ID of the first time-log into the timeLogs array of the storyline
  storyline.timeLogs.push(firstTimeLog._id)
  await storyline.save()
  res.redirect("/profile")
})

exports.post_timelog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("storylines")

  const selectedStoryline = user.storylines.find((story) => {
    return story.title === req.body.storySelect // Add the 'return' statement
  })

  const timeLog = new TimeLog({
    user: req.user.id,
    storylines: selectedStoryline._id,
    post: req.body.timelogPrev,
  })
  await timeLog.save()

  // Push the ID of the new time-log into the timeLogs array of the selected storyline
  selectedStoryline.timeLogs.push(timeLog._id)
  await selectedStoryline.save()

  res.redirect("/profile")
})
