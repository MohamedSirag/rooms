'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

global._ = require('lodash');

mongoose.connect('mongodb://localhost/rest-rooms', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('uploads'));
// routes
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/user', require('./routes/users'));
app.use('/api/reservations', require('./routes/reservations'));
// generic errors
app.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.send({
        error: {
            message: error.message
        }
    });
});

module.exports = app;