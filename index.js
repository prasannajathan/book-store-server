const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const { USERSROUTE, BOOKSSROUTE } = require('./constants')

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

app.use(USERSROUTE, require('./routes/userRegister'))
app.use(USERSROUTE, require('./routes/userLogin'))
app.use(USERSROUTE, require('./routes/isTokenValid'))
app.use(BOOKSSROUTE, require('./routes/bookCreate'))

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    throw err
  }
  // console.log('DB connected successfully')
})

const PORT = process.env.PORT || 3005
app.listen(PORT)
