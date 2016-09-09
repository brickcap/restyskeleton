#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");

var make_skeleton = function(){
    
    program.version('0.0.1')
	.option('-p, --project', 'Creates an openresty skeleton in the directory name supplied as argument')
	.parse(process.argv);
    
       if (program.project) console.log('  - peppers');
    if (program.pineapple) console.log('  - pineapple');
    if (program.bbqSauce) console.log('  - bbq');
    console.log('  - %s cheese', program.cheese);
};
make_skeleton();
