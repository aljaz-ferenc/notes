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
const AppError = require('./utils/AppError.js')
const errorHandler = require('./controllers/errorController')
const userRouter = require('./routes/userRoute.js')

process.on('uncaughtException', (err) => {
    console.log('Uncaught exception: ', err.message)
})

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


//Routes
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`The path ${req.originalUrl} does not exist`, 404))
})


//Database
const DB = process.env.DB

mongoose.connect(DB)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(`Error connecting to database: ${err}`))


//Server
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})


//Global error handler
app.use(errorHandler)

process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection: ', err.message)
    server.close(() => process.exit(1))
})
