#!/usr/bin/env node
"use strict";
const portc = process.argv.pop();
const srvc = require('./UDPServer');
srvc.client(portc);
