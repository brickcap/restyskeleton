##restyskeleton -- a pre haloween undertaking 

**WARNING -- procced at your own risk**

restyskeleton allows you to initialize a minimal openresty application with basic nginx configuration files and a straignforward directory structure that helps you organize your code. The default arrangement of files and directories is just a suggesstion, not a standared or a best practice. Nothing that scary despite it's grim name. Only a form that I've found useful in my own projects.

restyskeleton is intended to be used as a quick way to create a openresty applications, without having to invest too much energy on a project layout upfront, so that you can jump straight into the good stuff. Creating either standalone openresty servers or applications that give new life to your existing servers. 

It allows you to leap over the graves,so to speak. No need to roll up your sleeves and embark on a six feet deep earth digging enterprise, if I may be allowed to illustrate with an analogy. A side mission of the project is to give you ideas on how openresty code can be organized. Feel free to experiment with many different ways of arranging your files and settle on a form that suits you best. 

You must have node js installed on the system you wish to run restyskeleton on. Without node js the dead will lie pecaefully in their grave and foil all our evil plans. It's a sacrifice that must be made. Our Lord demands blood.  

**Turn back now**

restyskleton is simple to use. For a minimal usage restyskeleton requires you to specify a directory name in which you app is to be created. For example the following command:- 

```
restyskleton -d sacrifice

```
will create an openresty skeleton in the directory named sacrifie and automatically start the application. By default your application will run on port 3125 for "http" connections and 4125 for "https" connections. If the operation is successful you should see the following output on your terminal:-

```
[ALERT] Your app is running on http://localhost:3125

```

Wihtout any other parameters restyskleton makes the following assumptions.

1. Port 3125 is availale for http connections
2. Port 4125 is availale for https connections
3. nginx binary (the one that comes with openresty distribution) is avialable in
`/usr/local/openresty/nginx/sbin/nginx`

You can override all of these defaults with command line arguments. 


**Unholy incantations**

-p allows you to specify a port number for http connections
-s allows you to specify a port number for https connections
-n alows you to specify a path to nginx distribution (in case you've moved it to a different location)

Here's an example that illustrates how to use the options

```
restyskeleton -d sacrifice -p 3000 -s 4000 -n nginx

```
The command above will create an application in the sacrifice directory,running on ports 3000 and 4000.
If everything is successful you should see the following output on the terminal

```
[ALERT] Your app is running on http://localhost:3000

```
The parameters supplied as command line arguments will override the default values. Also note that if you've got nginx in your "path" you can simply supply that as an argument as well, no need to give the absolute location.  

**What have I done?!**

restyskelton creates for you:-

1. Two nginx master configuration files ,dev.ngx.conf and prod.ngx.conf,are created for development and production use respectively. The configuration directives for the two files are identical except for a couple of changes. Two different files allow you to independantly test and simulate development and production environments. The errors in dev.ngx.conf are logged on the console.
2. All the location level directives are placed in the files under the 'routes' directory. The files are organized as:-   app_routes (for application routes), static_routes(for serving static files), proxy_routes(for configuring all the proxy locations). These files are automatically included in the master configuration files. 
3. All the lua code goes in the 'lua' directory. There's a 'hello.lua' file that is served by a '/' location in the app_routes.conf file. You can check it out to see how it all **comes** together.  

**To my lord, Count Dracula, a liscence to bite**

MIT!
