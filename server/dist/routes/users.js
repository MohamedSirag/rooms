'use strict';

var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var guest = require('../middleware/guest');
var auth = require('../middleware/auth');
var AuthPolicy = require('../policies/AuthPolicy');
router.post('/register', [guest, AuthPolicy.register], UserController.register);
router.post('/login', [guest, AuthPolicy.login], UserController.login);
router.post('/forgot-password', guest, UserController.forgotPassword);
router.get('/', auth, UserController.me);
router.post('/reset-password', [guest, AuthPolicy.resetPassword], UserController.resetPassword);
router.delete('/:id', [auth, AuthPolicy.destroy], UserController.destroy);
module.exports = router;