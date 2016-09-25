#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");
var mustache = require("mustache");
var cp = require("child_process");
var chokidar = require('chokidar');
var run_path = process.cwd();
var lib_path = __dirname;

var watch_directory = function(dirnames,ngx_path,create_new){
    console.log("[BEHOLD!] Watching the project directory for changes");
    var watcher = chokidar.watch(dirnames,{
	ignored: /[\/\\]\./,
	persistent: true
    });
    watcher.on("change",function(path){
	console.log("[BEHOLD!] File Change:"+path);
	console.log("[HARK!] Restarting openresty");
	var arg = create_new?['-p./', '-cdev.ngx.conf']:['-p./', '-cdev.ngx.conf','-sreload'];
	var n_spawn = cp.spawn(ngx_path,arg,
				{stdio:"inherit"});
	
	n_spawn.on("error",function(data){
	    console.log(data);
	    process.exit(1);
	});

	n_spawn.on("message",function(data){
	    console.log(data);
	});		
    });
};

var make_skeleton = function(){

    var port = "3125";
    var port_ssl = "4125";
    var ngx_path = "/usr/local/openresty/nginx/sbin/nginx";
    var watch = false;
    program.version('6.6.6');        

    program.option('-d, --directory <dirname>',
		   'name of the sub-directory in which openresty skeleton should be created [default restyskeleton]')
	.option('-p, --port <port number>',"port on which nginx listens for http connections [default 3125] ")
	.option('-s,--portssl <ssl port number>',"port on which the nginx listens for https connections [default 4125]")
	.option('-n,--ngxp <ngxpath>',"path where nginx is installed [default /usr/local/openresty/nginx/sbin/nginx]")
	.option('-w,--watch',"spawns a daemon that automatically restarts openresty on file changes");
    program.parse(process.argv);

    var dir = program.directory||
	    function(){
		console.log("[HARK!] No directory name given");
		console.log("[BEHOLD!] Creating a project in restyskeleton");
		return "restyskeleton";
		
	    }();
    
    if(dir.indexOf("/")!==-1){
	console.log("[HARK!] Directory paths are not supported");
	console.log("[BEHOLD] For creating a project in a particular directory invoke restyskeleton from that directory");
	process.exit(1);
    }


    
    if(program.port) port = program.port;
    if(program.portssl )	port_ssl = program.portssl;
    if(program.ngxp) ngx_path = program.ngxp;
    if(program.watch) watch = true;

    if(fs.existsSync(dir) && watch){
	console.log("[HARK!] "+dir+" already exists" );
	shell.cd(run_path+"/"+dir);
	watch_directory(["lua","utils","routes"],ngx_path,true);
	return;
    }
    
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
	    var project_path = run_path+"/"+dir;
	    var file = fs.readFileSync(lib_path+"/files/dev.ngx.conf",'utf-8');
	    var rendered = mustache.render(file,{port_ssl:port_ssl,port:port});
	    shell.cd(lib_path);
	    shell.cp("-R","files/*",project_path);
	    shell.cd(project_path);
	    fs.writeFileSync(project_path+"/dev.ngx.conf",rendered);
	    var spawn =  cp.spawn(ngx_path,['-p./', '-cdev.ngx.conf'],
				  {stdio:"inherit"});
	    if(spawn.pid){
		console.log("[BEHOLD!] Your app is running on http://localhost:"+port);
		if(watch){
		   watch_directory(["lua","routes","utils"],ngx_path,false);

		}
	    }
	    spawn.on("error",function(data){
		console.log(data);
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
