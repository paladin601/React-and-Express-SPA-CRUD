const mongoose = require('mongoose');
const { Schema } = mongoose;

const PeopleSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, min: 1, required: true }
})

module.exports = mongoose.model('People', PeopleSchema);