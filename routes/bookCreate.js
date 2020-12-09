const router = require('express').Router()

const Book = require('../models/Book')
const auth = require('../middleware/auth')

router.post('/create', auth, async (req, res) => {
  try {
    const { image, title, author, preface, price } = req.body

    // Fallback - if front-end validation fails
    if (!image || !title || !author || !price) {
      return res.status(400).json({ msg: 'Fields are empty' })
    }

    const newBook = new Book({
      image,
      title,
      author,
      preface,
      price,
    })

    await newBook.save()
    res.json({ msg: 'Book added to the shelve' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
