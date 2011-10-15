var Db = require('../node_modules/mongodb').Db,
  Server = require('../node_modules/mongodb').Server,
  mongo = require('../node_modules/mongodb');

var MongoHandler = function(host, port, dbname){
  this.host = host;
  this.port = port;
  this.dbname = dbname;
  
  this.database = new Db(this.dbname, new Server(this.host, this.port, {}), {native_parser:false});
  
  this.countCollection = function (collectionName, response, database) {
    console.log("Entered counter" + database);
    
    database.collection(collectionName, function(err, collection) {
      if(err){
        throw err;
      }
            
      collection.count(function(err, result){
        if(err){
          throw err;
        }
        
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Inserted row, now total: " + result);
        response.end();
      });
    });
  };
  
};


MongoHandler.prototype.insert = function(collectionName, row, response) {
  var countHandler = this.countCollection;
  var database = this.database;
  
  database.open(function(err, db) {
    if(err) {
      throw err;
    }
    
    db.authenticate("admin", "Marlb0r000", function(err, success) {    
      if(success) {
        console.log("Connected to db " + db.toString());
        db.collection(collectionName, function(err, collection) {
          if(err){
            throw err;
          }
          collection.insert(row);
          console.log("Inserted to mongo server");
        });
        
        
        countHandler(collectionName, response, database);
        
        db.close();
      }
    });
  });
};



module.exports.create = function(host, port, dbname) {
  return new MongoHandler(host, port, dbname);
};

module.exports._class = MongoHandler;