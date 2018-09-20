var msgpack = require('msgpack5')(),
    encode = msgpack.encode,
    json2html = require('node-json2html');

module.exports = function() {
    return function (req, res, next) {
        console.info('Wywołano konwerter reprezentaji!');
        
        if (req.result){
            if (req.accepts('json')) {
                console.info('Wybrano reprezentacje JSON!');
                res.send(req.result);
                return;
            }
            
            if (req.accepts('html')) {
                console.info('Wybrano reprezentacje HTML!');
                var transfrom = {'tag': 'div', 'html': '${name} : ${value}'};
                res.send(json2html.transform(req.result, transform));
                return;
            }
            
            if (req.accepts('aplication/x-msgpack')) {
                console.info('Wybrano reprezentacje MSGPACK!');
                res.type('application/x-msgpack');
                res.send(encode(req.result));
                return;
            }
            
            console.info('Zostanie użyta reprezentacja domyślna - JSON!');
            res.send(req.result);
        }
        else {
            next();
        }
    }
};