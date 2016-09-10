local page = ngx.location.capture("/docs/index.html")
ngx.header.content_type =
   "text/html; charset=utf-8"

ngx.say(page.body)
