#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");
var cp = require("child_process");
var run_path = process.cwd();
var make_skeleton = function(){
    
    program.version('1.0.0');        
    program.option('-d, --directory <dirname>',
		   'Creates an openresty skeleton in the directory name supplied as argument')
	.action(function(dirname){
	    
	});
    program.parse(process.argv);
    var dir = program.directory;
    if (!fs.existsSync(dir)){
	try{
	    fs.mkdirSync(dir);
	    // shell.cd()
	    shell.cd(__dirname);
	    shell.cp("-R","files/*",run_path+"/"+dir);
	    shell.cd(run_path+"/"+dir);
	    var which = shell.which("nginx");
	    if(which.stdout.indexOf("openresty")===-1){
		console.log("restyskeleton could not find openresty in your path. Are you sure you have installed it?");
		console.log("Please cd into '"+dir
			    +"' and try running your application manually");
	    }
	    var spawn =  cp.spawn("/usr/local/openresty/nginx/sbin/nginx",
				  ['-p./', '-cdev.ngx.conf'],
				  {detached:true,stdio:"inherit"});
	    spawn.on("error",function(data){
		console.log(process.cwd());
		console.log(data);
		console.log("Couldn't start nginx");
		process.exit(1);
	    });
	       spawn.on("exit",function(data){
		process.exit(1);
	    });
	    
	    spawn.on("close",function(data){
		process.exit(1);
	    });
	    
	    spawn.on("disconnect",function(data){
		process.exit(1);
	    });

	    spawn.on("message",function(data){
		console.log(data);
	    });
	    
	    	    
	}
	catch(ex){
	    console.log(ex);
	    console.log("Can't create a project in " +dir);
	}
    }else{
	console.log("The directory "+ dir+
		    " already exists. Can't create an openresty skeleton in an existing directory" );
    }
    

};
make_skeleton();
