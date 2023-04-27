import {IncomingMessage} from "http";

const http = require('http');
const urlRegex = /^http:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

async function main(page: string): Promise<string> {
    if (urlRegex.test(page ? page : '')) {
        return new Promise((resolve, reject) => {
            const ans: any[] = []
            return http.request(page, {method: 'HEAD'}, (res: IncomingMessage) => {
                const strs: string[] = []
                strs.push('Headers', JSON.stringify(res.headers).toString());
                return res.on('data', (s) => {
                    //console.log('Data: ', s)
                    ans.push(s)
                }).on('end', () => {
                    try {
                        //console.log('ANS: ', ans)
                        if (ans.length > 0) {
                            strs.push(JSON.parse(Buffer.concat(ans).toString()));
                        }
                        resolve(JSON.stringify(strs))
                    } catch (e) {
                        reject(e)
                    }
                })
            }).on('error', (err) => {
                reject(err)
            }).end();
        })
    } else {
        return Promise.resolve().then(() => 'URL Invalida');
    }
}

module.exports = main;