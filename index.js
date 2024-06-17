//require express
const express = require('express')
const app = express()
const port = 9090

const connectDB = require('./db/connect')

//middlewares

const path = require("path")
require('dotenv').config()
app.use(express.static('./public'))
app.use(express.json())

//view engine

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//routes

const userRoute = require('./routes/user')
const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/url')
const URL = require("./models/url");



app.use('/', staticRoute)
app.use('/user', userRoute)
app.use('/url', urlRoute)
//main function

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Connection at Port:${port}`) })

    } catch (error) {
        console.log(error)
    }
}
start()