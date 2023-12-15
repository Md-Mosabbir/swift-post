var express = require("express")
var router = express.Router()
const authentication_controller = require("../controllers/authenticationController")

const { forwardAuthenticated } = require("../config/authConfig")
/* Explore page containing everyting */
router.get("/", forwardAuthenticated, function (req, res, next) {
  res.render("register")
})

router.post("/", authentication_controller.submit_register)

module.exports = router
