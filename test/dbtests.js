"use strict"
/**
 * @fileoverview 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 * @copyright Copyright (c) 2016 
 */

var MongoProvider = require('../lib/MongoProvider');
var MongoStore = require('../lib/MongoStore');

var config={

	 "mongo_connection": "mongodb://localhost/test",
	 	"mongo_options": {
      		"server": {
        		"auto_reconnect": true
      		}
		}
	}

var dbProvider = new MongoProvider(console.log);
dbProvider.data(config.mongo_connection,config.mongo_options,function(err,db){
	if (err){cb(err)}
		var dbStore = new MongoStore(db,console.log);
			//close
			dbProvider.close();

}); // end mongo provider