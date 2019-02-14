'use strict';

var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    if (!req.headers.hasOwnProperty('authorization')) {
        return next();
    }
    return res.status(301).send({
        message: 'You should be a guest to view this page.'
    });
};