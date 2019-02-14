'use strict';

var User = require('../models/User');
var PasswordReset = require('../models/PasswordReset');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var mailService = require('../services/mail');
module.exports = {
    login: async function login(req, res) {
        var user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({
                message: 'Invalid Credentials.'
            });
        }
        bcrypt.compare(req.body.password, user.password, function (err, isMatching) {
            if (!isMatching || err) {
                return res.status(401).send({
                    message: 'Invalid Credentials.'
                });
            }
            var token = jwt.sign({
                email: user.email,
                id: user._id
            }, process.env.JWT_KEY, {
                expiresIn: "1h"
            });
            return res.status(200).send({
                message: 'Logged In.',
                user: {
                    email: user.email,
                    rooms: user.rooms
                },
                meta: {
                    token: token
                }
            });
        });
    },
    register: async function register(req, res, next) {
        User.find({ email: req.body.email }).exec().then(function (user) {
            if (user.length) {
                return res.status(409).send({
                    message: 'Mail exists'
                });
            }
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).send({
                        error: err
                    });
                }
                var user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save().then(function (user) {
                    res.status(201).send({
                        message: 'User Created'
                    });
                }).catch(function (e) {
                    return next(e);
                });
            });
        });
    },
    resetPassword: async function resetPassword(req, res) {
        PasswordReset.findOne({ token: req.query.token }).populate('user').exec(function (err, reset) {
            if (reset) {
                bcrypt.hash(req.body.password, 10, function (error, hash) {
                    if (error) {
                        return res.status(500).send({
                            error: error
                        });
                    }
                    reset.user[0].updateOne({ password: hash }).then(function () {
                        reset.delete();
                        res.status(201).send({
                            message: 'Password has been changed successfully'
                        });
                    }).catch(function (e) {
                        return next(e);
                    });
                });
            } else {
                res.status(422).send({
                    message: 'Invalid Token'
                });
            }
        });
    },
    forgotPassword: async function forgotPassword(req, res) {
        var user = await User.findOne({ email: req.body.email }).exec();
        var passwordReset = await PasswordReset.create({
            _id: new mongoose.Types.ObjectId(),
            user: user._id,
            token: Math.random().toString(36).substr(2)
        });
        mailService.sendMail({
            from: process.env.USER_MAIL,
            to: req.body.email,
            subject: 'Reset your password',
            text: passwordReset.token
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.status(200).send({
                    message: 'Token is sent, kindly check your mail.'
                });
            }
        });
    },
    me: async function me(req, res) {
        res.status(200).send({ data: req.userData });
    },
    destroy: async function destroy(req, res) {
        var user = await User.findByIdAndRemove(req.params.id);
        if (user) {
            res.send({
                message: 'You have deleted your account.'
            });
        }
    }
};