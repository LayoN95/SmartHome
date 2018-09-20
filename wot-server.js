var httpServer = require('./servers/http'),
resources = require('./resources/model');
var dhtPlugin = require('./plugins/DHT11SensorPlugin');

dhtPlugin.start({'simulate': true, 'frequency': 10000});

var server = httpServer.listen(resources.pi.port, function(){
    console.info('Twoje webowe Pi jest uruchomione i dziala na porcie %s', resources.pi.port);
});