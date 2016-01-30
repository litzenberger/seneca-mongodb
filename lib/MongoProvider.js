
"use strict"
/**
 * @fileoverview 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 * @copyright Copyright (c) 2016 
 */

var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');

var MongoProvider = function (debug) {
  if (!(this instanceof MongoProvider))
	return new MongoProvider(debug);

  this.db={};// data db
  this.log=debug;
  debug("MongoProvider initialized")

};

MongoProvider.prototype.data= function(connection,options,cb) {
  var self=this
  MongoClient.connect(connection,options,function(err,db){
	if(err){return cb(err);}
	self.db=db;


	return cb(null,db);

  });
};


MongoProvider.prototype.getDb= function() {
	var self=this;
  return self.db;
};


MongoProvider.prototype.close= function() {
	var self=this;
	self.db.close(true,function (err) {
        if (err) self.log(err);
        else self.log("data close complete")});
	self.db={};  // start garbage collection
	return;
};


MongoProvider.prototype.getCollection= function(collection,cb) {
var self=this;
 self.db.collection(collection, function(error, col) {
	if( error ) {
	  cb(error);
	}
	else {
	  cb(null, col);
	}
  });

};

module.exports= MongoProvider;