const express = require('express')
const indexRoutes = require('./routes/indexRouter.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config({path: 'variables.env'})

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whitelist.some(dominio => dominio === origin)
        if(existe) {
            callback(null, true)
        } else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.static('uploads'))

app.use('/', indexRoutes())

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000

app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
})