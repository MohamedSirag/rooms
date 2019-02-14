const Room = require('../models/Room')
const mongoose = require('mongoose')

module.exports = {
    async index (req, res) {
        try {
            let rooms = await Room.find().populate('user', 'email rooms')
            if (rooms.length) {
                res.send(rooms)
            } else {
                res.status(404).send({
                    message: 'No Entries Found'
                })       
            }

        } catch(e) {
            next(e)
        }
    },
    async show (req, res, next) {
        try {
            const room = await Room.findById(req.params.id).populate('reservations')
            res.send({ room })
        } catch(e) {
            e.status = 404
            e.message = "Could not find this room"
            next(e)
        }
    },
    async store(req, res, next) {
        try {
            req.body.user = req.userData.id
            let room = await Room.create(req.body)
            res.status(201).send(room)
        } catch(e) {
            e.message = 'Something wrong happened.'
            next(e)
        }
    },
    async update(req, res) {
        let room = await Room.findById(req.params.id).populate('reservations', 'start_date end_date')
        if(!_.size(room.reservations)){
            room = await Room.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            res.send(room)
        }
        res.status(400).send({
            error: {
                message: 'Room is already reserved, you can not update it at the moment.'
            }
        })
    },
    async destroy (req, res) {
        try {
            let room = await Room.findById(req.params.id).populate('reservations')
            if(!_.size(room.reservations)) {
                room = await User.findByIdAndRemove(req.params.id)
                if (room) {
                    res.send({
                        message: 'You have deleted this room.',
                        room
                    })
                }
            }            
            res.status(400).send({
                error: {
                    message: 'Room is already reserved, you can not update it at the moment.'
                }
            })

        } catch(e) {
            next(e)
        }

    }
}
