var httpServer = require('./servers/http'),
resources = require('./resources/model');

//Internal Plugins
var dhtPlugin = require('./plugins/DHT11SensorPlugin');
var ledsPlugin = require('./plugins/ledsPlugin');

dhtPlugin.start({'simulate': true, 'frequency': 10000});
ledsPlugin.start({'simulate': false});
var server = httpServer.listen(resources.pi.port, function(){
    console.info('Twoje webowe Pi jest uruchomione i dziala na porcie %s', resources.pi.port);
});