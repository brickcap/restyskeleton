#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");
var mustache = require("mustache");
var cp = require("child_process");
var run_path = process.cwd();
var lib_path = __dirname;

var make_skeleton = function(){

    var port = "3125";
    var port_ssl = "4125";
    var ngx_path = "/usr/local/openresty/nginx/sbin/nginx";
    
    program.version('6.6.6');        

    program.option('-d, --directory <dirname>','name of the sub-directory  in which openresty skeleton should be created')
    .option('-p, --port <port number>',"port on which nginx listens for http connections [default 3125] ")
    .option('-s,--portssl <ssl port number>',"port on which the nginx listens for https connections [default 4125]")
    .option('-n,--ngxp <ngxpath>',"path where nginx is installed [default /usr/local/openresty/nginx/sbin/nginx]")
    .option('-w,--watch <watch>',"starts a daemon that automatically restarts openresty on file changes");
    program.parse(process.argv);

    var dir = program.directory;
    if(!program.directory){
	console.log("[HARK!] A project directory must be specified");
	process.exit(1);
    }
    if(program.directory.indexOf("/")!==-1){
	console.log("[HARK!] Directory paths are not supported");
	console.log("[BEHOLD] For creating a project in a particular directory invoke restyskeleton from that directory");
	process.exit(1);
    }
    
    if(program.port) port = program.port;
    if(program.portssl )	port_ssl = program.portssl;
    if(program.ngxp) ngx_path = program.ngxp;
    
    if(!parseInt(port)){
	console.log("[HARK!] Port must be an integer");
	process.exit(1);
    }
    if(!parseInt(port_ssl)){
	console.log("[HARK!] Port must be an integer");
	process.exit(1);
    }
    
    if (!fs.existsSync(dir)){
	try{
	    fs.mkdirSync(dir);
	    // shell.cd()
	    var file = fs.readFileSync(lib_path+"/files/dev.ngx.conf",'utf-8');
	    var rendered = mustache.render(file,{port_ssl:port_ssl,port:port});
	    shell.cd(lib_path);
	    shell.cp("-R","files/*",run_path+"/"+dir);
	    shell.cd(run_path+"/"+dir);
	    fs.writeFileSync(run_path+"/"+dir+"/dev.ngx.conf",rendered);
	    var spawn =  cp.spawn(ngx_path,['-p./', '-cdev.ngx.conf'],
				  {stdio:"inherit"});
	    if(spawn.pid){
		console.log("[BEHOLD] Your app is running on http://localhost:"+port);
	    }
	    spawn.on("error",function(data){
		console.log(data);
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
	    console.log("[HARK!] Can't create a project in " +dir);
	    console.log(ex);
	    shell.rm("-R",'"'+dir+'/"');
	    process.exit(1);
	}
    }else{
	console.log("[HARK!] Can't create an openresty skeleton in an existing directory" );
    }
    

};
make_skeleton();
