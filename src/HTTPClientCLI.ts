#!/usr/bin/env node

const page = process.argv.pop()
require('./HTTPClient')(page).then((s) => {
    console.log(s.toString()
        .replace(/;/g, "; \n")
        .replace(/\\"/g, '"')
        .replace(/(\[)|(\])/g, "")
    )
}).catch((e) => {
    console.log('ERROR')
    console.error(e)
})