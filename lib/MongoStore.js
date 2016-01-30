"use strict"
/**
 * @fileoverview 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 * @copyright Copyright (c) 2016 
 */

var _ = require('underscore');
var async = require('async');

/* 
* @constructor
* @param db - data to be inserted
* @param log - log
*/
var MongoStore = function (db,debug) {
  if (!(this instanceof MongoStore))
	return new MongoStore(db,log);
	this.db=db;
	this.log=debug;
	debug("MongoStore initialized")
};

/* function
* @param data - data to be inserted
* @param cb - callback
*/
MongoStore.prototype.use = function(collection,cb){
  var self=this;
  self.collection=collection;
  self.log("mongostore use");
  return cb();
};

/* function
* @param docs - data 
* @param key - key to be updated
* @param cb - callback
*/
MongoStore.prototype.updateMulti= function (docs,key,cb){

	var self=this;
	self.log(JSON.stringify(docs));
	async.forEach(docs,function(doc,callback){
		self.db.collection(self.collection).update({_id:doc._id},{$set:_.pick(doc, key)},{
     		upsert: true,
     		multi: true
   			},function(err,r){
				callback();
		});

	},
	function(err) {
    	self.log('done');
    	cb();
	})
}

/* function
* @param data - data to be inserted
* @param cb - callback
*/
MongoStore.prototype.insert = function (data,cb){

	var self=this;
	self.log(JSON.stringify(data));
	self.db.collection(self.collection).insert(data,function(err,r){
			return cb(null,r);
		});

}

/* function
* @param pipeline - aggregate pipeline
* @param cb - callback
*/
MongoStore.prototype.aggregate = function (pipeline,cb){
	var self=this;
	self.log(JSON.stringify(pipeline));
	self.db.collection(self.collection).aggregate(pipeline,function(err,data){
		if(err){return cb(err)}
		if(data ===null){return cb(new Error("no data"))};
			cb(null,data);
	});
}





module.exports= MongoStore;