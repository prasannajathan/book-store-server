const jwt = require('jsonwebtoken')
const router = require('express').Router()

const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/is-token-valid', auth, async (req, res) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) {
      return res.json(false)
    }
    // Verify Token
    const isVerified = jwt.verify(token, process.env.JWT_TOKEN)
    if (!isVerified) {
      return res.json(false)
    }
    // Find user
    const user = await User.findById(isVerified.id)
    if (!user) {
      return res.json(false)
    }
    return res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
