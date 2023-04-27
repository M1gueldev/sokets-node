#!/usr/bin/env node

const port = process.argv.pop()

const srv = require('./UDPServer')

srv.server(port)