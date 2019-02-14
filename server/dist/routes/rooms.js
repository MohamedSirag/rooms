'use strict';

var express = require('express');
var router = express.Router();
var RoomController = require('../controllers/RoomController');
var auth = require('../middleware/auth');
var guest = require('../middleware/guest');

var RoomPolicy = require('../policies/RoomPolicy');
router.post('/', [auth, RoomPolicy.store], RoomController.store);
router.get('/', auth, RoomController.index);
router.get('/:id', auth, RoomController.show);
router.put('/:id', auth, RoomController.update);
router.delete('/:id', auth, RoomController.destroy);
module.exports = router;