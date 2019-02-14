'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reservationSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    room: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }],
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('Reservation', reservationSchema);