##restyskeleton -- a pre haloween undertaking 

**WARNING**

restyskeleton allows you to initialize a minimal openresty application with basic nginx configuration files and a basic directory structure to help you organize your code. The default arrangement of files and directories is only just a suggesstion, somtehing that I've found useful in my own projects.

restyskeleton is intended to be used as a quick way to create an openresty application and give you ideas on how openresty code can be organized. Feel free to experiment with various ways on organizing your code and settle on a form that suits you best. 

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



**What have I done?!**

**To my lord, count dracula**

MIT
