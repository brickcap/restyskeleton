#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");

var make_skeleton = function(){
    
    program.version('1.0.0')        
	.option('-p, --project', 'Creates an openresty skeleton in the directory name supplied as argument');
	program.parse(process.argv);
    if(program.project){
	
    }

};
make_skeleton();
