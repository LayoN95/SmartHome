var resources = require('./../resources/model');

var interval, sensor;
var model = resources.pi.sensors.ds18b20;
var pluginName = resources.pi.sensors.ds18b20.name;
var localParam = {'simulate': false, 'frequency': 2000};

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

var sensor = {
    initialize: function () {
        
    },
read: function () {
    ds18b20.temperature('28-00000a38e7b7', function(err, val) {
    	model.value = val;
	console.info("Current temperature is", val);
})


setTimeout(function () {
	sensor.read();
	}, localParams.frequecny);
}
};
     if (sensor.initialize()) {
    console.info('Hardware %s sensor started!', pluginName);
    sensor.read();
  } else {
    console.warn('Failed to initialize sensor!');
  }
};
