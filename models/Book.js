const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String, required: true },
  author: { type: String },
  price: { type: String }
})
const Book = mongoose.model('book', bookSchema)
module.exports = Book
