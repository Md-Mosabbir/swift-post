const User = require("../models/users")
const bcrypt = require("bcryptjs")
const passport = require("passport")
// POST-ing the form of registration

exports.submit_register = (req, res) => {
  const { first_name, last_name, username, email, password, passwordconfirm } =
    req.body

  //Array of Errors
  let errors = []

  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !password ||
    !passwordconfirm
  ) {
    errors.push({ msg: "Please enter all fields" })
  }
  if (password != passwordconfirm) {
    errors.push({ msg: "Passwords do not match" })
  }
  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 6 characters" })
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      first_name,
      last_name,
      username,
      email,
      password,
      passwordconfirm,
    })
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" })
        res.render("register", {
          errors,
          first_name,
          last_name,
          username,
          email,
          password,
          passwordconfirm,
        })
      } else {
        const newUser = new User({
          first_name,
          last_name,
          username,
          email,
          password,
        })
        //Encrypting the password

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in",
                )
                res.redirect("/login")
              })
              .catch((err) => console.log(err))
          })
        })
      }
    })
  }
}

exports.login = (req, res, next) => {
  passport.authenticate("local", {
    //! Subject to change
    successRedirect: "/explore",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  req.flash("success_msg", "You are logged out")
  res.redirect("/login")
}
