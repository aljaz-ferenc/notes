const express = require('express')
const cookieParser  = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const app = express()

const limiter = rateLimit({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests, try again in an hour!'
})


    app.use(morgan('dev'))


//Global middlewares
app.use(cookieParser())
app.use(helmet())
app.use('/api', limiter)
app.use(express.json())
app.use(mongoSanitize())
app.use(xss())

app.use('/', (req, res) => {
    console.log('hello world')
    res.end()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})