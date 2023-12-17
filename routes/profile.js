var express = require("express")
var router = express.Router()

const { ensureAuthenticated } = require("../config/authConfig")

/* Explore page containing everyting */
router.get("/", ensureAuthenticated, function (req, res, next) {
  res.render("profile")
})

module.exports = router
