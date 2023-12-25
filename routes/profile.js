const express = require("express")
const router = express.Router()
const profile_controller = require("../controllers/profileController")
const { ensureAuthenticated } = require("../config/authConfig")

router.get("/", ensureAuthenticated, profile_controller.get_profile)

router.get(
  "/:username",
  ensureAuthenticated,
  profile_controller.get_storylines_and_timelogs,
)

module.exports = router
