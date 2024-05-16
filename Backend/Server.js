require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const authRouter = require('./Routes/auth')
const userRoutes = require('./Routes/User')
const schedulingRoutes = require('./Routes/Scheduling')
const contactRouter = require('./Routes/emails')
const cors = require('cors')
const morgan = require('morgan')
//Express app
const app = express()

//Middleware
app.use(express.json()) // convert body to json
app.use(morgan('dev'))

//cors
const options = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(options))

//Routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRouter)
app.use('/api/emails', contactRouter)
app.use('/api/scheduling', schedulingRoutes)

//Connect to Databse
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        //Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(
                'Connected to database & Listening on port',
                process.env.PORT,
            )
        })
    })
    .catch((error) => {
        console.log(error)
    })
