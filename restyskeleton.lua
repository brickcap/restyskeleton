#!/usr/bin/env lua
local argparse = require "argparse"

local parser = argparse("restyskeleton", "Bootstrap openresty projects")

parser:option("-V --version", "Print version and exit", "6.6.6")
parser:option("-I --include", "Include locations."):count("*")

local args = parser:parse()
print(args)  -- Assuming print is patched to handle tables nicely.
