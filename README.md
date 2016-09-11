##restyskeleton -- a pre haloween undertaking 

**WARNING**

restyskeleton allows you to initialize a minimal openresty application with basic nginx configuration files and a straignforward directory structure that helps you organize your code. The default arrangement of files and directories is just a suggesstion, not a standared or a best practice. Nothing that scary despite it's grim name. Only a form that I've found useful in my own projects.

restyskeleton is intended to be used as a quick way to create an openresty application without investing too much energy on a project layout upfront so you can jump straight into the good stuff.  .give you ideas on how openresty code can be organized. Feel free to experiment with many different ways of arranging your files and settle on a form that suits you best. 

Openresty works really well with your existing application servers.  With restyskleton you can quickly create openresty applications that can enhance the abilities of your servers.

**Turn back now**

The basic usage is simple. For a minimal usage restyskeleton requires you to specify a directory name in which you app is to be created. For example the following command:- 

```
restyskleton -d sacrifice

```
will create an openresty skeleton in the directory named sacrifie and automatically start the application. By default your application will run on port 3125 for "http" connections and 4125 for "https" connections. If the operation is successful you should see the following output on your terminal:-

```
[ALERT] Your app is running on http://localhost:3125

```

For a minimal usage restyskleton makes some assumptions.

1. Port 3125 is chosen for http connections
2. Port 4125 is chosen for https connections
3. nginx (the one that comes with openresty distribution) is assumed to be present in
`/usr/local/openresty/nginx/sbin/nginx`

You can override all of these defaults with arguments passed to the scripts. 


**Unholy incantations**

-p allows you to specify a port number for http connections
-s allows you to specify a port number for https connections
-n alows you to specify a path to nginx distribution (in case you've moved it to a different location)

Here's an example that illustrates the usage of all of these commands in a single usage

```
restyskeleton -d sacrifice -p 3000 -s 4000 -n nginx

```
If everything is successful you should see the following output on the terminal

```
[ALERT] Your app is running on http://localhost:3000

```
The parameters supplied as command line arguments override the default values. Also note that if you've got nginx in your "path" you can simply supply that as an argument as well no need to give the absolute location.  

**What have I done?!**

restyskelton creates for you:-

1. Two nginx master configuration files dev.ngx.conf and prod.ngx.conf for development and production use specifically. The configuration directives for the two files are identical except for a couple of changes. Two different files allow you to independantly test and simulate development and production environments. The errors in dev conf are logged on the console.
2. All the location level configuration is placed in the routes directory. The files are organized as  app_routes (for application routes), static_routes(for serving static files), proxy_routes(for configuring all the proxy locations). These routes are included in the master configuration files. 
3. All the lua code goes in the lua directory. There's a hello.lua file that is served by a '/' location in the app_routes.conf file. You can check it out to see how it all **comes** together.  

**To my lord, count dracula a liscence to bite**

MIT!
