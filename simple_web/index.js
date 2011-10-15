var fs = require("fs");
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

var htmlPages = {};
htmlPages.std = fs.readFileSync("./simple_web/views/start.html").toString();
htmlPages.start = fs.readFileSync("./simple_web/views/start.html").toString();
htmlPages.upload = fs.readFileSync("./simple_web/views/upload.html").toString();

server.start(router.route, handle, htmlPages);