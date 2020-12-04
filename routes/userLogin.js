const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for empty fields; TODO: front-end should validate;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Fields are empty' })
    }

    // Check if email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Username doesn\'t exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credentials are invalid' })
    }

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
    res.json({
      token,
      user: {
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
