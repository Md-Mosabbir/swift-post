require("dotenv").config()
const mongoose = require("mongoose")
var createError = require("http-errors")
var express = require("express")
var expressLayouts = require("express-ejs-layouts")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const compression = require("compression")
const passport = require("passport")
const flash = require("connect-flash")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)

var index = require("./routes/index")
var profile = require("./routes/profile")
const register = require("./routes/register")
const login = require("./routes/login")
const explore = require("./routes/explore")
const create = require("./routes/createJourneys")
const storyline = require("./routes/show")
var users = require("./routes/users")

var app = express()

const methodOverride = require("method-override")

// Passport Config
require("./config/passport")(passport)

const MONGODB_URI = process.env.MONGODB_URI
mongoose.set("strictQuery", false)

// Database setup
main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(MONGODB_URI)
}

app.use(compression())

// view engine setup
app.use(expressLayouts)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))

// Create a new instance of MongoDBStore
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
})

// Express session with MongoDBStore
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: store,
  }),
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  next()
})

// Routes
app.use("/", index)
app.use("/register", register)
app.use("/login", login)
app.use("/explore", explore)
app.use("/profile", profile)
app.use("/create", create)
app.use("/storyline", storyline)
app.use("/users", users)

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
