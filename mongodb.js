"use strict"
/**
 * @fileoverview 
 * @author @litzenberger rlitzenberger@solidearth.com (ron litzenberger) 
 *
 */
var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');

module.exports = function( options) {

	var seneca = this;
	var config = options;

	var noop = function () {};
	var plugin = "mongoDb";
	var MongoProvider = require('./lib/MongoProvider');
	var MongoStore = require('./lib/MongoStore');
	var dbClient,dbProvider;
	// init seneca plugins
	seneca.add('init:mongoDb',init);
	seneca.add({role : plugin,cmd : 'close'}, close);// store in a collection 
	seneca.add({role : plugin,cmd : 'aggregateSave'}, aggregate);// 
	seneca.add({role : plugin,cmd : 'insert'}, insert);// 
	// store in a collection 

	// initialize
	function init (args,cb) {
		var ertieneca = this;
		dbProvider= new MongoProvider(seneca.log);
		dbProvider.data(config.mongo_connection,config.mongo_options,function(err,db){
			if (err){cb(err)}
				dbClient = new MongoStore(db,seneca.log);
				return cb();
 		}); // end mongo provider
	}

	function close (args,cb) {
		var seneca = this;
		MongoProvider.close();
		cb();
	}

	function aggregate(args,cb){
		var seneca = this;
		//TODO use async.series
		seneca.log.debug("-- start listings agg --");
		eventClient.use("events",function(){
			eventClient.aggregate(args.class,args.start,args.daybefore,args.pipeline,function(err,results) {
				if(err){return cb(err)}
				statsClient.use("spring_daily",function(){
				statsClient.insertsite(results,function(err,action){
					if(err){cb(err);}
					console.log("stats insert")
					cb();
				})
				});

			});
		})
	}

/* function
* @param args.collection - collection to use
* @param args.doc - doc to be inserted
*/
	function insert(args,cb){
		var seneca = this;
		var collection=args.collection;
		seneca.log.debug("-- start insert --");
		dbClient.use(collection,function(){
			dbClient.insert(args.doc,function(err,results) {
				if(err){return cb(err)}
					console.log("stats insert")
					cb();
			})
		});
	}

/* function
* @param args.collection - collection to use
* @param args.doc - doc to be inserted
*/

	function store(data,cb){
		var seneca = this;
			eventClient.listing(function(err,results) {
				if(err){return cb(err)}
				seneca.log.debug(results);
				cb(null,results);
			});
	}
	return {
		name:plugin
	}

}