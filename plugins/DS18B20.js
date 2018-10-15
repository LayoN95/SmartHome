var resources = require('./../resources/model');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "SmartHome",
  password: "raspberry",
  database: "SmartHome"
});

var interval, sensor;
var model = resources.pi.sensors.ds18b20;
var pluginName = resources.pi.sensors.ds18b20.name;
var localParam = {'simulate': false, 'frequency': 2000};

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



//ds18b20.sensors(function(err,ids)
//{
//});

function connectHardware() {
var ds18b20 = require('ds18b20');

  
	
    ds18b20.temperature('28-00000a38e7b7', function(err, val) {
    model.value = val;
    console.info("Current temperature is", val);
    sendDB();

	setTimeout (function () {
	connectHardware();
	}, localParams.frequecny);
}
)};

function sendDB() {
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var date = dt.format('Y-m-d H:M:S');
console.log(date.toString());
  var sql = ("INSERT INTO `DS18B20` (id, temperature, date) VALUES ('',"+model.value+",NOW())");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
 
};
