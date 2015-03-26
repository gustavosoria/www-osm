/**
 * @author Trilogis
 * @type {exports}
 */

//IMPORTS
var http = require("http");

var wayServices = require('./services/wayServices.js');
var nodeServices = require('./services/nodeServices.js');
var searchServices = require('./services/searchServices.js');
var bboxServices = require('./services/bboxServices.js');
var relationServices = require('./services/relationServices.js');

var Router = require('node-simple-router');

//INIT VARS
var router = Router();
var server = http.createServer(router);

//HOME
router.get('/', function(request, response) {
    response.end("<html><head><title>www-osm</title></head><body><div>www-osm</div></body></html>");
});

//SERVER STARTUP
server.listen(2222);

//WEB-SERVICES STARTUP
wayServices.start(router);
nodeServices.start(router);
searchServices.start(router);
bboxServices.start(router);
relationServices.start(router);

console.log ("server is listening at localhost:2222");