'use strict';

var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    try {
        var decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY, null);
        req.userData = decoded;
        next();
    } catch (e) {
        return res.status(401).send({
            message: 'Unauthenticated'
        });
    }
};