const asyncHandler = require("express-async-handler")
const User = require("../models/users")
const Storyline = require("../models/storylines")
const Timelog = require("../models/timeLogs")

exports.get_storylines_and_timelogs = asyncHandler(async (req, res) => {
  //Get the storylines and the first timelog
  const user = await User.findById(req.user.id).populate({
    path: "storylines",
    populate: {
      path: "timeLogs",
    },
  })

  // Render the EJS template and pass user data
  res.render("profile", { user })
})

exports.get_profile = asyncHandler(async (req, res) => {
  const userId = req.user.id

  //Find the user
  const user = await User.findById(userId)

  const username = user.first_name

  res.redirect(`/profile/${username.toLowerCase()}`)
})

exports.get_edit_profile = asyncHandler(async (req, res) => {
  const id = req.user.id

  const user = await User.findById(id)

  const { first_name, last_name, username, email } = user

  res.render("editProfile", {
    first_name_edit: first_name,
    last_name_edit: last_name,
    username_edit: username,
    email_edit: email,
  })
})

exports.post_edit_profile = asyncHandler(async (req, res) => {
  const id = req.user.id

  let errors = []

  const { first_name_edit, last_name_edit, username_edit, email_edit } =
    req.body

  try {
    const user = await User.findOne({
      $or: [{ email: email_edit }, { username: username_edit }],
    })

    if (user) {
      errors.push({ msg: "Email or Username already exists" })
      res.render("editProfile", {
        errors,
        first_name_edit,
        last_name_edit,
        username_edit,
        email_edit,
      })
    } else {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          first_name: first_name_edit,
          last_name: last_name_edit,
          username: username_edit,
          email: email_edit,
        },
        { new: true },
      )
      // Handle the updated user or perform additional actions
      res.redirect("/profile")
    }
  } catch (error) {
    console.error(error)
    // Handle other errors, if any
    res.status(500).send("Internal Server Error")
  }
})

exports.get_delete_profile = asyncHandler(async (req, res) => {
  res.render("deleteProfile")
})

exports.delete_profile = asyncHandler(async (req, res) => {
  let errors = []
  const userId = req.user.id

  const { deleteProfile } = req.body

  try {
    const user = await User.findById(userId)

    if (!user) {
      // Handle the case where the user is not found
      res.status(404).send("User not found")
      return
    }

    if (user.username !== deleteProfile) {
      errors.push({ msg: "Wrong Username" })
      res.render("deleteProfile", { errors })
    } else {
      await Storyline.deleteMany({ user: userId })
      await Timelog.deleteMany({ user: userId })
      await User.findByIdAndDelete(userId)

      res.redirect("/register")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

exports.add_pic = asyncHandler(async function (req, res, next) {
  const id = req.user.id
  const user = await User.findById(id)

  user.profileImage = req.file.filename

  await user.save()

  res.redirect("/profile")
})

exports.logout = (req, res) => {
  // Using the callback function provided by req#logout
  req.logout((err) => {
    if (err) {
      console.error(err)
      // Handle the error, perhaps by sending an error response
      res.status(500).send("Internal Server Error")
      return
    }

    // Successful logout
    req.flash("success_msg", "You are logged out")
    res.redirect("/login")
  })
}
