var express = require("express")
var router = express.Router()

const exploreController = require("../controllers/exploreController")

router.get("/", exploreController.index)

module.exports = router
