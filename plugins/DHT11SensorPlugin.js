
var resources = require('./../resources/model'),
  utils = require('./../utils/utils.js');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "SmartHome",
  password: "raspberry",
  database: "SmartHome"
});

var interval, sensor, temp, humidity;
var model = resources.pi.sensors;
var pluginName = 'Temperature & Humidity';
var localParams = {'simulate': false, 'frequency': 1000};

 con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
});

exports.start = function (params) {
  localParams = params;
  if (params.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (params.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function connectHardware() {
 var sensorDriver = require('node-dht-sensor');
  var sensor = {
    initialize: function () {
      return sensorDriver.initialize(11, model.temperature.gpio); //#A
    },
    read: function () {
      var readout = sensorDriver.read(); //#B
     temp = (model.temperature.value = parseFloat(readout.temperature.toFixed(2)));
     humidity = (model.humidity.value = parseFloat(readout.humidity.toFixed(2))); //#C
      showValue();
        sendDB();

      setTimeout(function () {
        sensor.read(); //#D
      }, localParams.frequency);
    }
  };
  if (sensor.initialize()) {
    console.info('Hardware %s sensor started!', pluginName);
    sensor.read();
  } else {
    console.warn('Failed to initialize sensor!');
  }
};

function simulate() {
  interval = setInterval(function () {
    model.temperature.value = utils.randomInt(0, 40);
    model.humidity.value = utils.randomInt(0, 100);
    showValue();
  }, localParams.frequency);
  console.info('Simulated %s sensor started!', pluginName);
};

function showValue() {
  console.info('Temperature: %s C, humidity %s \%',
    model.temperature.value, model.humidity.value);
};

function sendDB() {
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var date = dt.format('Y-m-d H:M:S');
console.log(date.toString());
  var sql = ("INSERT INTO `DHT11` (id, temperature, humidity, date) VALUES ('',"+model.temperature.value+","+model.humidity.value+",NOW())");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
 
};

//#A Initialize the driver for DHT22 on GPIO 12 (as specified in the model)
//#B Fetch the values from the sensors
//#C Update the model with the new temperature and humidity values; note that all observers will be notified
//#D Because the driver doesn’t provide interrupts, you poll the sensors for new values on a regular basis with a regular timeout function and set sensor.read() as a callback
