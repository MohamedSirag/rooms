const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/RoomController')
const auth = require('../middleware/auth')
const guest = require('../middleware/guest')

const AuthPolicy = require('../policies/AuthPolicy')
// router.get
module.exports = router;
