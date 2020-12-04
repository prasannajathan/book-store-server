const router = require('express').Router()

const Book = require('../models/Book')

router.get('/list/:id?', async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findOne({ _id: id })
    if (!book) {
      return res.status(400).json({ msg: 'Book is not in the shelve' })
    }

    res.json(book)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
