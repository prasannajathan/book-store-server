const router = require('express').Router()


const Book = require('../models/Book')

router.get('/list', async (req, res) => {
  try {
    const page = req.query.page || 0
    const limit = req.query.limit || 5
    const options = {
      page,
      limit,
    }

    const lists = await Book.paginate({}, options)

    res.json(lists)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
