'use strict';

var _ReservationService = require('../services/ReservationService.js');

var Reservation = require('../models/Reservation');
var Room = require('../models/Room');
var mongoose = require('mongoose');
var moment = require('moment');

module.exports = {
    index: async function index(req, res) {
        var testRes = new _ReservationService.ReservationService();
        testRes.isInBetweenHours("", "");
        var reservations = await Reservation.find().populate('user', 'email');
        if (reservations.length) {
            res.send(reservations);
        } else {
            res.status(404).send({
                message: 'No Entries Found'
            });
        }
    },
    store: async function store(req, res) {
        var room = await Room.findById(req.params.roomId).populate('reservations');

        var start_hour = moment(req.body.start_date).hour();
        var end_hour = moment(req.body.end_date).hour();
        if (start_hour >= room.start_hour && start_hour < room.end_hour && end_hour > start_hour && room.end_hour >= end_hour) {
            if (_.size(room.reservations)) {
                _.each(room.reservations, function (reservation) {
                    //     moment(reservation.start_date).hour()

                    console.log(reservation);
                });
                // checks for reservations, if doesn't match return response, otherwise proceed and create down there.
                // reserve 5-6 if my start is greater than or equal to reserved start and less than end reserved,
                // if my end is greater than or equal to reserved start 
            }

            req.body.user = req.userData.id;
            req.body.room = room.id;

            req.body.start_date = moment(new Date(req.body.start_date));
            req.body.end_date = moment(new Date(req.body.end_date));
            var _reservation = await Reservation.create(req.body);
            // // room.update( { reservations: reservation._id } )
            room = await Room.findByIdAndUpdate(req.params.roomId, { reservations: _reservation._id });
            res.status(201).send(_reservation);
        } else {
            res.status(422).send({
                error: {
                    message: 'Invalid hours for reservation.'
                }
            });
        }
    },
    update: async function update(req, res) {},
    destroy: async function destroy(req, res) {
        try {
            reservation = await Reservation.findByIdAndRemove(req.params.id);
            if (reservation) {
                res.send({
                    message: 'Your reservation has been cancelled.',
                    reservation: reservation
                });
            }
        } catch (e) {
            next(e);
        }
    }
};