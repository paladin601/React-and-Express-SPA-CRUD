const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const { mongoose } = require('./database');

//Setting
app.set('port', process.env.PORT || 5001);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/crud', require('./router/router'));
//Folders static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(path.join(__dirname, '../node_modules')));

app.listen(app.get('port'), () => {
    console.log("server run in http://localhost:" + app.get('port'));
})
