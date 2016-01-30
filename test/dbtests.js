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

//test db connction insert and update
var dbProvider = new MongoProvider(console.log);
dbProvider.data(config.mongo_connection,config.mongo_options,function(err,db){
	if (err){cb(err)}
		var dbStore = new MongoStore(db,console.log);
			//close
			dbStore.use("testingCollection",function(){

				var doc={_id:"uniquekeytest",
					a:1,
					b:2
				}
				// test insert
				dbStore.insert(doc,function(err,results){
					if(err){cb(err);}
					console.log("doc insert")
					var doc=[{_id:"uniquekeytest",
					c:3}]
					// test multi
					dbStore.updateMulti(doc,"c",function(err,results){
						if(err){cb(err);}
						console.log("doc update")
						dbProvider.close();

					})

				})

			})

}); // end mongo provider