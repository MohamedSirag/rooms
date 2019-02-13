const express = require('express')
const router = express.Router()
const ReservationController = require('../controllers/ReservationController')
const auth = require('../middleware/auth')
const guest = require('../middleware/guest')
router.get('/', auth, ReservationController.index)

module.exports = router;
