"use strict";

var Joi = require('joi');
// add acl.
module.exports = {
    store: function store(req, res, next) {
        var schema = {
            start_hour: Joi.number().min(0).max(24).integer().required(),
            end_hour: Joi.number().min(0).max(24).integer().required(),
            name: Joi.string().min(3).max(32),
            location: Joi.required()
        };

        var _Joi$validate = Joi.validate(req.body, schema),
            error = _Joi$validate.error,
            value = _Joi$validate.value;

        if (error) {
            return res.status(422).json({
                messages: error.details.map(function (error) {
                    return error.message;
                }),
                data: value
            });
        }

        if (req.body.start_hour > req.body.end_hour) {
            return res.status(422).json({
                error: {
                    message: "You have to reserve with less hours."
                }
            });
        }
        next();
    }
};