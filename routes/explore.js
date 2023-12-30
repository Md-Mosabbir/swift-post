var express = require("express")
var router = express.Router()
const explore_controller = require("../controllers/exploreController")

const { ensureAuthenticated } = require("../config/authConfig")
/* Explore page containing everyting */
router.get("/", ensureAuthenticated, explore_controller.get_timelogs)

module.exports = router
