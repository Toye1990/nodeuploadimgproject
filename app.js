const express = require("express")
const app = express();
const exphfileupld = require("express-fileupload");
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")
require("dotenv").config()
const generalroutes = require("./routes/generatalroute") 
const accountroutes = require("./routes/accountroutes") 
const authroutes = require('./routes/authroute')

const url = process.env.MONGODB
// connect to mongo server
mongoose.connect(url).then(()=>{
    console.log("Connecting to mongodb database")
}).catch((err)=>{
    console.log("Error connecting to mongodb database" + err.message)
})




// template engine
app.engine("hbs", exphbs.engine({
    extname:".hbs",
    defaultLayout: "main",
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))



// view engine settings
app.set('view engine', "hbs")


// middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieparser())
app.use(exphfileupld())
app.use("/", generalroutes)
app.use("/account", accountroutes)
app.use("/", authroutes)


app.use("*", (req, res)=>{
    res.render("404")
})

const port = process.env.PORT
app.listen(port, ()=>{
    console.log("listening on port "+port)
})






















/*const express = require('express')
const app = express()
const fileupload = require('express-fileupload')
const exphald = require('express-handlebars')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')

require('dotenv').config()
const generalrouting = require('./routes/generatalroute')


// Connect to MongoDB
const url = process.env.MONGO_URI
mongoose.connect(url).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err) =>{
    console.log('failed to connect to database' + err.message)
})

//set up template engine
app.engine("hbs", exphald.engine(
    {
        extname: ".hbs",
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }
))

//setup view engine
app.set('view engine', "hbs")


//middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json)
app.use(cookieparser())
app.use(fileupload())
app.use('/', generalrouting)

app.use("*", (req, res)=>{
    res.render("error")
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('server listen on port' + PORT)
})*/