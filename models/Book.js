const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const bookSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String, required: true },
  author: { type: String },
  price: { type: String },
  preface: { type: String },
  created_at: { type: Date, default: Date.now },
})

bookSchema.plugin(mongoosePaginate)
const Book = mongoose.model('book', bookSchema)

module.exports = Book
