##restyskeleton -- Spawning barebones openresty applications from the terminal using ancient witchcraft.

![badman](https://github.com/brickcap/restyskleton/blob/master/files/images/badman.jpg)

**WARNING -- proceed at your own peril**

restyskeleton allows you to initialize a minimal openresty application with basic nginx configuration files and a straightforward directory structure that helps you organize your code. The default arrangement of files and directories is just a suggestion, not a standard or a best practice just a form that I've found useful in my own projects. It does nothing scary despite it's grim name. 

**BEWARE**

restyskeleton is intended to be used as a quick way to create openresty applications, without having to invest too much energy on a project layout upfront, so that you can jump straight into the good stuff. Creating either standalone openresty servers or applications that give new life to your existing servers with the help of programmable proxy magic. 

It allows you to leap over the graves,so to speak. In other words there's no need to roll up your sleeves and embark on a six feet deep, earth digging enterprise, if I may be allowed to illustrate with an analogy. A side mission of the project is to give you ideas on how openresty code can be organized. Feel free to experiment with  different ways of arranging your files and settle on a form that suits you best. 

**ALAS**

You must have node js installed on the system you wish to run restyskeleton on. Without node js the dead will lie peacefully in their grave and foil all our evil plans. It's a sacrifice that must be made. Our Lord demands blood.  

**Turn back now**

To summon restyskeleton use the following spell

```
npm install -g restyskeleton

```

restyskleton is simple to use. For a minimal usage it requires you to specify a directory name in which you app is to be created. For example the following command:- 

```
restyskleton -d sacrifice

```
will create an openresty skeleton in the directory named sacrifice and instantaneously bring it to life. By default your application's pulse can be felt on nerve 3125 for "http" connections and 4125 for "https" connections. If the spell is successful your screen will turn red and you'll see the following words inscribed on your terminal:-

```
[BEHOLD] Your app is running on http://localhost:3125

```

Without any other parameters restyskleton makes the following assumptions.

1. Port 3125 is available for http connections
2. Port 4125 is available for https connections
3. nginx binary (the one that comes with openresty distribution) is available in
`/usr/local/openresty/nginx/sbin/nginx`

You can override all of these defaults with command line arguments. 


**Unholy incantations**

* -p allows you to specify a port number for http connections
* -s allows you to specify a port number for https connections
* -n allows you to specify a path to nginx distribution (in case you've moved it to a different location)

Here's an example that illustrates how to use the options

```
restyskeleton -d sacrifice -p 3000 -s 4000 -n nginx

```
The command above will manifest an application in the sacrifice directory,respirating on ports 3000 and 4000.
If everything is successful your screen will turn blood red and the following words shall be inscribed on it

```
[BEHOLD] Your app is running on http://localhost:3000

```
The parameters supplied as command line arguments will override the default values. Also note that if you've got nginx in your "path" you can simply supply that as an argument as well, no need to give the absolute location.  

**What have I done?!**

When restyskleton is summoned:-

1. Two nginx master configuration files ,dev.ngx.conf and prod.ngx.conf,are created for development and production use respectively. The configuration directives for the two files are identical except for a couple of changes. Two different files allow you to independently test and simulate development and production environments. The errors in dev.ngx.conf are logged on the console.
2. All the location level directives are placed in the files under the 'routes' directory. The files are organized as:-   *app_routes (for application routes)*, *static_routes(for serving static files)*, *proxy_routes(for configuring all the proxy locations)*. These files are automatically included in the master configuration files. 
3. All the lua code shunned to the 'lua' directory. There's a 'hello.lua' file that is served by a '/' location in the app_routes.conf file. You can check it out to see how it works. Just keep in mind that it's black magic. Your eyes may pop out if you don't handle it delicately.  

**To my lord, Count Dracula, a licence to bite**

[MIT](https://github.com/brickcap/restyskleton/blob/master/README.md)!
