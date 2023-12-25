const express = require("express")
const router = express.Router()

const create_controller = require("../controllers/createController")

const { ensureAuthenticated } = require("../config/authConfig")

router.get("/", ensureAuthenticated, create_controller.get_storylines)

router.post(
  "/create-story",
  ensureAuthenticated,
  create_controller.post_storyline,
)
router.post(
  "/create-timelog",
  ensureAuthenticated,
  create_controller.post_timelog,
)

module.exports = router
