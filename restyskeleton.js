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
    var ngx_path = "/usr/local/openresty/nginx/sbin/nginx";
    
    program.version('1.0.0');        

    program.option('-d, --directory <dirname>','directory in which openresty skeleton should be created')
    .option('-p, --port <port number>',"port on which nginx server should run [default 3125] ")
    .option('-s,--portssl <ssl port number>',"port on which the nginx secure server should run [default 4125]")
    .option('-n,--ngxp <ngxpath>',"openresty's nginx distribution path [default /usr/local/openresty/nginx/sbin/nginx]");

    program.parse(process.argv);

    var dir = program.directory;

    if(program.port)	port = program.port;
    if(program.portssl)	port_ssl = program.portssl;
    if(program.ngxp)ngx_path = program.ngxp;

    if (!fs.existsSync(dir)){
	try{
	    fs.mkdirSync(dir);
	    // shell.cd()
	    var file = fs.readFileSync("files/dev.ngx.conf",'utf-8');
	    var rendered = mustache.render(file,{port_ssl:port_ssl,port:port});
	    shell.cd(__dirname);
	    shell.cp("-R","files/*",run_path+"/"+dir);
	    shell.cd(run_path+"/"+dir);
	    fs.writeFileSync(run_path+"/"+dir+"/dev.ngx.conf",rendered);
	    var spawn =  cp.spawn(or_path,['-p./', '-cdev.ngx.conf'],
				  {stdio:"inherit"});
	    if(spawn.pid){
		console.log("Your app is running on http://localhost:"+port);
	    }
	    spawn.on("error",function(data){
		console.log(data);
		console.log("[ERR] Couldn't start nginx");
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
	    console.log("[ERR] Can't create a project in " +dir);
	}
    }else{
	console.log("[ERR] Can't create an openresty skeleton in an existing directory" );
    }
    

};
make_skeleton();
