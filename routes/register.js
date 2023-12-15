var express = require("express")
var router = express.Router()
const authentication_controller = require("../controllers/authenticationController")
/* Explore page containing everyting */
router.get("/", function (req, res, next) {
  res.render("register")
})

router.post("/", authentication_controller.submit_register)

module.exports = router
