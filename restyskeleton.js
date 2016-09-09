#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");

var make_skeleton = function(){
    
    program.version('1.0.0');        
    program.option('-d, --directory <dirname>', 'Creates an openresty skeleton in the directory name supplied as argument')
	.action(function(dirname){
	    
	    if (!fs.existsSync(dirname)){
		try{
		    fs.mkdirSync(dirname);
		    console.log("Openresty app is ready in:"+dirname+"" );
		}
		catch(excep){
		    console.log("Can't create a project in " +dirname);
		}
	    }
	});
    program.parse(process.argv);
    

};
make_skeleton();
