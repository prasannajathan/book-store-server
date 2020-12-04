const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) {
      return res.status(401).json({ msg: 'Authorization denied' })
    }

    const isVerified = jwt.verify(token, process.env.JWT_TOKEN)
    if (!isVerified) {
      return res.status(401).json({ msg: 'Verification Failed' })
    }
    req.user = isVerified.id
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = auth
