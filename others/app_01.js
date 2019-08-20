// import http from 'http';
const http = require('http');

const routes = require('../routes');

const server = http.createServer(routes.handlerTwo);


console.log(routes.initText);

server.listen(3000);