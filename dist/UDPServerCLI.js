#!/usr/bin/env node
"use strict";
const port = process.argv.pop();
const srv = require('./UDPServer');
srv.server(port);
