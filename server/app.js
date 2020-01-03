var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')

var app = express();

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../client/dist')))
app.use(express.json())

app.post('/signup', require("./signup.js"))
app.post('/login', require("./login.js"))

app.use(require('./auth.js').auth)


app.listen(8000)