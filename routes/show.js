const express = require("express")
const router = express.Router()
const storyline_and_timelog = require("../controllers/storylineAndTimelogController")
const { ensureAuthenticated } = require("../config/authConfig")

// Storyline routes

router.get(
  "/:storylineId",
  ensureAuthenticated,
  storyline_and_timelog.get_storylines,
)
router.post(
  "/:storylineId/edit",
  ensureAuthenticated,
  storyline_and_timelog.update_storyline,
)
router.delete(
  "/:storylineId/delete",
  ensureAuthenticated,
  storyline_and_timelog.delete_storyline,
)

//TimeLog routes

router.get(
  "/time-log/:timeLogId",
  ensureAuthenticated,
  storyline_and_timelog.get_timeLogs,
)
router.post(
  "/time-log/:timeLogId/edit",
  ensureAuthenticated,
  storyline_and_timelog.update_timeLog,
)
router.delete(
  "/time-log/:timeLogId/delete",
  ensureAuthenticated,
  storyline_and_timelog.delete_timeLog,
)

module.exports = router
