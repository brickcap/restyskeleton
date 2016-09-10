local page = ngx.location.capture("/docs/index.html")
ngx.header.content_type =
   "text/html; charset=utf-8"
ngx.header["ETag"] = page.header["ETag"]

ngx.say(page.body)
