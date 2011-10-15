function route(handle, htmlPages, pathname, response) {
  console.log("About to route request for " + pathname);
  
  if(typeof handle[pathname] === 'function') {
    var pageKey = "";
    if(pathname == "/" ) {
      pageKey = "std";
    }
    else {
      pageKey = pathname.replace("/","");    
    }
    
    handle[pathname](response, htmlPages[pageKey]);
  }
  else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;