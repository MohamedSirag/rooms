const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
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

})
userSchema.post('find', async (docs,next) => {
    for (let doc of docs) {
      await doc.populate('rooms').execPopulate();
    }
    next()
})
userSchema.post('save', (doc, next) => {
  doc.populate('rooms').execPopulate().then( () => next());
});

module.exports = mongoose.model('User', userSchema)
