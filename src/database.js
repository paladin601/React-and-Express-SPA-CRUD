const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/crud';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connected mongo ON'))
    .catch(err => console.error(err));

module.exports = mongoose;