const express = require("express")
const router = express.Router()
const users = require("../controllers/userController")
const { ensureAuthenticated } = require("../config/authConfig")

router.get("/:userId", ensureAuthenticated, users.get_user)

router.get("/:userId/:storylineId", ensureAuthenticated, users.get_storyline)

module.exports = router
