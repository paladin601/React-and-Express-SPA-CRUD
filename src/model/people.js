const mongoose = require('mongoose');
const { Schema } = mongoose;

const PeopleSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    ci: { type: Number, required: true },
    age: { type: Number, min: 1, max: 300, required: true }
})

module.exports = mongoose.model('People', PeopleSchema);