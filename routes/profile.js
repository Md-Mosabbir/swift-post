const express = require("express")
const router = express.Router()
const profile_controller = require("../controllers/profileController")
const { ensureAuthenticated } = require("../config/authConfig")

router.get("/", ensureAuthenticated, profile_controller.get_profile)

router.get("/edit", ensureAuthenticated, profile_controller.get_edit_profile)

router.post("/edit", ensureAuthenticated, profile_controller.post_edit_profile)

router.get(
  "/delete",
  ensureAuthenticated,
  profile_controller.get_delete_profile,
)

router.delete("/delete", ensureAuthenticated, profile_controller.delete_profile)

router.get(
  "/:username",
  ensureAuthenticated,
  profile_controller.get_storylines_and_timelogs,
)

module.exports = router
