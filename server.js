let http = require('http');
let qs = require('querystring');
let genKey = require('./lib/editkeygen');
let router = (req, res) => {
    if (req.url === '/favicon.ico') {
        res.end();
        return;
    }

    let queryStr = req.url.substr(req.url.indexOf('?') + 1);
    let query = qs.parse(queryStr);

    if (!query.userName) {
        return res.end('userName can\'t be empty');
    }

    let key = genKey(query.userName);

    res.end(JSON.stringify({userName: query.userName, SN: key}));

};
const server = http.createServer(router);

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

const port = process.env.PORT || 9000;
server.listen(port);
console.log(`editplus keygen server listen on port ${port}`);