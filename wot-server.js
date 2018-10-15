var httpServer = require('./servers/http'),
    wsServer = require('./servers/websockets'),
    resources = require('./resources/model');

//Internal Plugins
var dhtPlugin = require('./plugins/DHT11SensorPlugin');
    //ledsPlugin = require('./plugins/ledsPlugin');
var ds18b20Plugin = require('./plugins/DS18B20');

dhtPlugin.start({'simulate': false, 'frequency': 10000});
ds18b20Plugin.start({'simulate': false, 'frequency': 10000});
//ledsPlugin.start({'simulate': false, 'frequency': 10000});

var server = httpServer.listen(resources.pi.port, function(){
    console.log('Uruchomiono serwer HTTP...');
    wsServer.listen(server);
    console.info('Twoje webowe Pi jest uruchomione i dziala na porcie %s', resources.pi.port);
});
