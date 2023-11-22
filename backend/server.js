const express = require('express')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const limiter = rateLimit({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests, try again in an hour!'
})


//Global middlewares
app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
    credentials: true
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(helmet())
app.use('/api', limiter)
app.use(express.json())
app.use(mongoSanitize())
app.use(xss())


//Database
const DB = process.env.DB

mongoose.connect(DB)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(`Error connecting to database: ${err}`))


//Server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})

