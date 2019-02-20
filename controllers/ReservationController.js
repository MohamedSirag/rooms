'use strict'
const Reservation = require('../models/Reservation')
const Room = require('../models/Room')
const mongoose = require('mongoose')
const moment = require('moment');
module.exports = {
    async index(req, res) {
        const reservations = await Reservation.find().populate('user', 'email')
        if (reservations.length) {
            res.json(reservations)
        } else {
            res.status(404).json({
                message: 'No Entries Found'
            })
        }
    },

    async store(req, res) {
        const room = await Room.findById(req.params.roomId).populate('reservations')
        const start_hour = moment(req.body.start_date).hour()
        const end_hour = moment(req.body.end_date).hour()
        req.body.start_date = new Date(req.body.start_date)
        req.body.end_date = new Date(req.body.end_date)

        if (
            start_hour >= room.start_hour &&
            start_hour < room.end_hour &&
            end_hour > start_hour &&
            room.end_hour >= end_hour
        ) {
            if (_.size(room.reservations)) {
                let number = await Reservation.count({
                    "start_date": {
                        $lte: req.body.start_date
                    },
                    "end_date": {
                        $gte: req.body.start_date
                    }
                })
                res.status(422).json({
                    error: {
                        message: 'Room is already reserved at this time.'
                    }
                })
            }

            req.body.user = req.userData.id
            req.body.room = room.id
            const reservation = await Reservation.create(req.body)
            await Room.findByIdAndUpdate(req.params.roomId, { reservations: { $push: reservation._id } })
            res.status(201).json(reservation)
        } else {
            res.status(422).json({
                error: {
                    message: 'Invalid hours for reservation.'
                }
            })
        }
    },
    async update(req, res) {
        const room = await Room.findById(req.params.roomId).populate('reservations')
        const start_hour = moment(req.body.start_date).hour()
        const end_hour = moment(req.body.end_date).hour()
        req.body.start_date = new Date(req.body.start_date)
        req.body.end_date = new Date(req.body.end_date)

        if (
            start_hour >= room.start_hour &&
            start_hour < room.end_hour &&
            end_hour > start_hour &&
            room.end_hour >= end_hour
        ) {
            if (_.size(room.reservations)) {
                let number = await Reservation.count({
                    "start_date": {
                        $lte: req.body.start_date
                    },
                    "end_date": {
                        $gte: req.body.start_date
                    }
                })
                res.status(422).json({
                    error: {
                        message: 'Room is already reserved at this time.'
                    }
                })
            }

            req.body.user = req.userData.id
            req.body.room = room.id
            const reservation = await Reservation.findByIdAndUpdate(req.params.reservationId, {
                start_date: req.body.start_date,
                end_date: req.body.end_date
            })
            res.status(201).json(reservation)
        } else {
            res.status(422).json({
                error: {
                    message: 'Invalid hours for reservation.'
                }
            })
        }

    },
    async destroy(req, res) {
        try {
            reservation = await Reservation.findByIdAndRemove(req.params.id)
            if (reservation) {
                res.json({
                    message: 'Your reservation has been cancelled.',
                    reservation
                })
            }
        } catch (e) {
            next(e)
        }

    }
}
