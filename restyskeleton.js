#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");
var mustache = require("mustache");
var cp = require("child_process");
var run_path = process.cwd();
var make_skeleton = function(){
    var port = "3125";
    var port_ssl = "4125";
    var or_path = "/usr/local/openresty/nginx/sbin/nginx";
    program.version('1.0.0');        
    program.option('-d, --directory <dirname>','directory in which openresty skeleton should be created')
	.option('-p, --port <port number>',"port on which nginx server should start [default 3125] ")
	.option('-ps,--portssl <ssl port number>',"port on which the ssl server should start [default 4125]")
    .option('-n,--ngxp <ngxpath>',"path of openresty's ngx distribution [default /usr/local/openresty/nginx/sbin/nginx]");
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
				  {stdio:"inherit"});
	    if(spawn.pid){
		console.log("Your app is running on http://localhost:3125");
	    }
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
