var httpServer = require('./servers/http'),
resources = require('./resources/model');

var server = httpServer.listen(resources.pi.port, function(){
    console.info('Twoje webowe Pi jest uruchomione i dziala na porcie %s', resources.pi.port);
});