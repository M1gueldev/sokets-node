#!/usr/bin/env node

const portc = process.argv.pop()

const srvc = require('./UDPServer')

srvc.client(portc)
