const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/RoomController')
const auth = require('../middleware/auth')
const guest = require('../middleware/guest')

const RoomPolicy = require('../policies/RoomPolicy')
router.post('/', [auth, RoomPolicy.store], RoomController.store)
router.get('/', auth, RoomController.index)
router.get('/:id', auth, RoomController.show)
router.put('/:id', auth, RoomController.update)
router.delete('/:id', auth, RoomController.destroy)
module.exports = router;
