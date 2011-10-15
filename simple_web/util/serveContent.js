var fs = require('fs');

module.exports = function(req, res, route) {
  console.log("FILE:" + req.url.substr(1));
  fs.readFile("./simple_web/" + req.url.substr(1), function(err, data) {
    if(err) { 
      route();
    }
    else {
      console.log("Read file content for " + req.url.substr(1));
          
      res.writeHead(200, {"Content-Type": "application/javascript"});
      res.write(data.toString());
      res.end();
    }
  });
};