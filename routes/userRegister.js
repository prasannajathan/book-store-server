const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ msg: 'Fields are empty' })
    }
    // check password length
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password characters should be minimum of 6' })
    }

    const isExistingUser = await User.findOne({ email })
    if (isExistingUser) {
      return res.status(400).json({ msg: 'Email already exists.' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: passwordHash,
      firstName,
      lastName
    })
    // Save user
    await newUser.save()
    res.json({ msg: 'Account created' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
