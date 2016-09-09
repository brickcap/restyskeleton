#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");

var make_skeleton = function(){
    
    program.version('0.0.1')        
	.option('-p, --project', 'Creates an openresty skeleton in the directory name supplied as argument')
        .action(function(cmd,options){
	    console.log(cmd);
	    console.log(options);
	});
	program.parse(process.argv);
    

};
make_skeleton();
