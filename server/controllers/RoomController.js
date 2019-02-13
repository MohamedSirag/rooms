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
            let room = await Room.findById(req.params.id).populate('user', 'email rooms')
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
            console.log(e)
            e.message = 'Something wrong happened.'
            next(e)
        }
    },
    async update(req, res) {
        let room = await Room.findById(req.params.id).populate('reservations', 'start_date end_date')
        console.log(room)
        // let room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true
        // })
        // res.send(room)
    },
    async destroy (req, res) {
        try {

           let room = await Room.findOne(req.params.id).populate('reservations').
           res.send({ room })
        } catch(e) {
            next(e)
        }

    }
}
