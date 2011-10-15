
function start(response, html) {
  console.log("Request handler 'start' was called.");
  writeResponse(response, html);


  // BLOCKING call 
  /*
  function sleep(ms) {
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + ms);
  }  
  sleep(5000);
  */
  
 
}

function upload(response, html) {
  console.log("Request handler 'create' was called.");
  writeResponse(response, html);
}

function writeResponse(response, html) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(html);
  response.end();
}


exports.start = start;
exports.upload = upload;