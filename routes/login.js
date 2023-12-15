var express = require("express")
var router = express.Router()
const authentication_controller = require("../controllers/authenticationController")

const { forwardAuthenticated } = require("../config/authConfig")

/* Explore page containing everyting */
router.get("/", forwardAuthenticated, function (req, res, next) {
  res.render("login")
})

router.post("/", authentication_controller.login)

module.exports = router
