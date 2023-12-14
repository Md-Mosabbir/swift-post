var express = require("express")
var router = express.Router()

/* Explore page containing everyting */
router.get("/", function (req, res, next) {
  res.render("login")
})

module.exports = router
