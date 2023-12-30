var express = require("express")
const asyncHandler = require("express-async-handler")
var router = express.Router()

const User = require("../models/users")
const Storyline = require("../models/storylines")
const Timelog = require("../models/timeLogs")

/* Explore page containing everyting */
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const timelogs = await Timelog.find()
      .limit(10)
      .populate("user")
      .populate("storylines")

    res.render("index", { timelogs })
  }),
)

module.exports = router
