const Reservation = require('../models/Reservation')
const mongoose = require('mongoose')

module.exports = {
    async index (req, res) {
        let reservations = await Reservation.find().populate('user', 'email')
        if (reservations.length) {
            res.send(reservations)
        } else {
            res.status(404).send({
                message: 'No Entries Found'
            })       
        }
    }
}
