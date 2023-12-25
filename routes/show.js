const express = require("express")
const router = express.Router()
const storyline_and_timelog = require("../controllers/storylineAndTimelogController")
const { ensureAuthenticated } = require("../config/authConfig")

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
module.exports = router
