const express = require('express');
const path = require('path');
var mongoose = require('mongoose');

var cors = require('cors');
var app = express();

var cookieParser = require('cookie-parser');
mongoose.connect('mongodb://localhost:27017/lmsDb', {useNewUrlParser: true,useUnifiedTopology: true}).then(() => {
  console.log('Mongodb Connected');
}).catch((err) => {
  console.log(`Mongodb Connection Failed : ${err}`);
});
require('./models/model');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var corsOptions = {
    origin : 'http://localhost:4200',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}

app.use(cors(corsOptions));
var server = app.listen(3000, function() {
    console.log('Ready on port %d', server.address().port);
});
var api = require('./routes/api');
app.use('/api', api);
module.exports = app;