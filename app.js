const mongoose = require("mongoose")
require("dotenv").config()
var createError = require("http-errors")
var express = require("express")
var expressLayouts = require("express-ejs-layouts")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var exploreRouter = require("./routes/explore")

var app = express()

const MONGODB_URI = process.env.MONGODB_URI
mongoose.set("strictQuery", false)
//Database setup

main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(MONGODB_URI)
}

// view engine setup
app.use(expressLayouts)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/explore", exploreRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
