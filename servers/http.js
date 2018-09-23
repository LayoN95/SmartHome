var express = require('express'),
    actuatorsRoutes = require('./../routes/actuators'),
    sensorRoutes = require('./../routes/sensors'),
    resources = require('./../resources/model'),
    converter = require('./../middleware/converter'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    

var app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorRoutes);

app.get('/pi', function(req, res){
    res.send('To jest webowe PI!')
});

app.use(converter());

module.exports = app;