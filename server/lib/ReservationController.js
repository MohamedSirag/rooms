'use strict';

var _ReservationService = require('../services/ReservationService');

var _ReservationService2 = _interopRequireDefault(_ReservationService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reservation = require('../models/Reservation');
var Room = require('../models/Room');
var mongoose = require('mongoose');
var moment = require('moment');

module.exports = {
    index: async function index(req, res) {
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
        console.log(_ReservationService2.default.store());
        var start_hour = moment(req.body.start_date).hour();
        var end_hour = moment(req.body.end_date).hour();
        if (start_hour >= room.start_hour && start_hour < room.end_hour && end_hour > start_hour && room.end_hour >= end_hour) {

            if (_.size(room.reservations)) {
                // checks for reservations, if doesn't match return response, otherwise proceed and create down there.
                // reserve 5-6 if my start is greater than or equal to reserved start and less than end reserved,
                // if my end is greater than or equal to reserved start 
                // reserved 5-8
                // check if it's within available hours.
                // 3-10
                // 5-8
                // 4-9
            }

            req.body.user = req.userData.id;
            req.body.room = room.id;

            req.body.start_date = moment(new Date(req.body.start_date));
            req.body.end_date = moment(new Date(req.body.end_date));
            // const reservation = await Reservation.create(req.body)
            // room  = await Room.findByIdAndUpdate(req.params.roomId, { reservation: reservation._id })

            // res.status(201).send(reservation)
        }
    },
    update: async function update(req, res) {},
    destroy: async function destroy(req, res) {
        try {
            reservation = await Reservation.findByIdAndRemove(req.params.id);
            if (reservation) {
                res.send({
                    message: 'You have deleted this room.',
                    reservation: reservation
                });
            }
        } catch (e) {
            next(e);
        }
    }
};