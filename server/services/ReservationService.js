'use strict'
const moment = require('moment');
export  class ReservationService {
    isHoursValid(reservation_start_hour, reservation_end_hour) {
        const room = await Room.findById(req.params.roomId).populate('reservations')
        const start_hour =  moment(req.body.start_date).hour()
        const end_hour = moment(req.body.end_date).hour()
        // is the hour of reservation, between start and end?
    }
    isInBetweenHours(start_hour, end_hour) {
        console.log("hi")
    }
}
