const express = require('express')
const router = express.Router()
const ReservationController = require('../controllers/ReservationController')
const auth = require('../middleware/auth')
const guest = require('../middleware/guest')

router.get('/', auth, ReservationController.index)
router.post('/:roomId', auth, ReservationController.store)
router.put('/:reservationId/rooms/:roomId', auth, ReservationController.store)
router.delete('/:id', auth, ReservationController.destroy)

module.exports = router;
