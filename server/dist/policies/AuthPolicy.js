'use strict';

var Joi = require('joi');
module.exports = {
  register: function register(req, res, next) {
    var schema = {
      email: Joi.string().required().email(),
      password: Joi.string().min(3).max(15).required().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
      password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
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
    next();
  },
  resetPassword: function resetPassword(req, res, next) {
    var schema = {
      token: Joi.string().required().token(),
      password: Joi.string().min(3).max(15).required(),
      password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    };
    var request = {
      token: req.query.token,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation
    };

    var _Joi$validate2 = Joi.validate(request, schema),
        error = _Joi$validate2.error,
        value = _Joi$validate2.value;

    if (error) {
      return res.status(422).json({
        messages: error.details.map(function (error) {
          return error.message;
        }),
        data: value
      });
    }
    next();
  },
  destroy: function destroy(req, res, next) {
    if (req.userData.id != req.params.id) {
      return res.status(400).json({
        messages: 'You can not delete other users.'
      });
    }
    next();
  },
  login: function login(req, res, next) {
    var schema = {
      email: Joi.string().required().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    };

    var _Joi$validate3 = Joi.validate(req.body, schema),
        error = _Joi$validate3.error,
        value = _Joi$validate3.value;

    if (error) {
      return res.status(422).json({
        messages: error.details.map(function (error) {
          return error.message;
        }),
        data: value
      });
    }
    next();
  }
};