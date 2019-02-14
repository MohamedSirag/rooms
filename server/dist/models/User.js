'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    rooms: [{
        type: Schema.Types.ObjectId, ref: 'Room'
    }]

});
userSchema.post('find', async function (docs, next) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var doc = _step.value;

            await doc.populate('rooms').execPopulate();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    next();
});
userSchema.post('save', function (doc, next) {
    doc.populate('rooms').execPopulate().then(function () {
        return next();
    });
});

module.exports = mongoose.model('User', userSchema);