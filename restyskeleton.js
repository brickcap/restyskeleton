#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");

var make_skeleton = function(){
    
    program.version('1.0.0');        
    program.option('-d, --directory <dirname>','Creates an openresty skeleton in the directory name supplied as argument')
	.action(function(dirname){
	    
	});
    program.parse(process.argv);
    if (!fs.existsSync(program.directory)){
	try{
	    fs.mkdirSync(program.directory);
	    shell.cp("-R","files/*",program.directory);
	    console.log("Your Openresty skeleton is ready.");
	    shell.cd(program.directory);
	    var out = shell.exec("nginx  -p ./  -c ./dev.ngx.conf");
	    console.log(out.stdout);
	    console.log(out.stderr);
	}
	catch(ex){
	    console.log(ex);
	    console.log("Can't create a project in " +program.directory);
	}
    }else{
	console.log("The directory "+ program.directory+" already exists. Can't create an openresty skeleton in an existing directory" );
    }
    

};
make_skeleton();
