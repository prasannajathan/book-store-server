const router = require('express').Router()

const Book = require('../models/Book')

router.get('/list', async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const options = {
      page,
      limit,
      select: ['title', 'price'],
    }
    const books = await Book.paginate({}, options)
    res.json(books)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
