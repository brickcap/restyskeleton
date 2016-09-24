var chokidar = require('chokidar');
var cp = require("child_process");

var watcher = chokidar.watch(".",{
    ignored: /[\/\\]\./,
    persistent: true
});
process.on("message",function(data){
    console.log(watcher);
    watcher.on("change",function(path){
	console.log("[HARK!] Restarting openresty");
    });
});
