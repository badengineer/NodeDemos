var http =  require("http");
var url  =  require("url");
var serveContent = require("./util/serveContent");

function start(route, handle, htmlPages) {
  function  onRequest(request,  response)  {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    
    serveContent(request, response, function(){
      route(handle, htmlPages, pathname, response);
    });
  }
  
  http.createServer(onRequest).listen(process.env.C9_PORT);
  console.log("Server  has  started.");
}

exports.start = start;