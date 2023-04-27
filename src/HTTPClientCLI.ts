#!/usr/bin/env node

const page = process.argv.pop()
require('./HTTPClient')(page).then((s) => {
    console.log(s)
}).catch((e) => {
    console.log('ERROR')
    console.error(e)
})