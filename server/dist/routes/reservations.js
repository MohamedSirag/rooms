'use strict';

var express = require('express');
var router = express.Router();
var ReservationController = require('../controllers/ReservationController');
var auth = require('../middleware/auth');
var guest = require('../middleware/guest');
router.get('/', auth, ReservationController.index);
router.post('/:roomId', auth, ReservationController.store);
router.delete('/:id', auth, ReservationController.destroy);
module.exports = router;