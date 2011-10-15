var http =  require("http");
var url  =  require("url");
var mongoHandler  =  require("./mongoHandler");

function start() {
  function  onRequest(request,  response)  {
    var collectionName = "test";
    var mh = mongoHandler.create("dbh63.mongolab.com", 27637, "appcarve");
    
    mh.insert(collectionName, { author: "Hans Meier", title: "How to prototype" }, response);
  }
  
  http.createServer(onRequest).listen(process.env.C9_PORT);
  console.log("Server  has  started.");
}

exports.start = start;