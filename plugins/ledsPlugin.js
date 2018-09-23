var resources = require('./../../resources/model');

var actuator, internal;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;
var localParams = {'simulate':false, 'frequency': 2000};

exports.start = function (params) {
    localParams = params;
    observe(model); //#A
    
    if (localParams.simulate) {
        simulate();
    } else {
        connectHardware();
    }
};

exports.stop = function() {
    if (localParams.simulate) {
        clearInterval(interval);
    } else {
        actuator.unexport();
    }
    console.info('%s plugin stopped!', pluginName);
};

function observe(what) {
    Object.observe(what, function (changes) {
        console.info('Change detected by plugin for %s...', pluginName);
        switchOnOff(model.value); //B
        
    });
};

function switchOnOff(value) {
    if (!localParams.simulate) {
        actuator.write(value === true ? 1 : 0, function () {
            console.info('Changed value of %s to %s', pluginName, value);
        });
    }
};