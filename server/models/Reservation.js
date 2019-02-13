const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reservationSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user : [{
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
})
module.exports = mongoose.model('reservation',reservationSchema)
