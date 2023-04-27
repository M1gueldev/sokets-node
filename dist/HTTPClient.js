"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const urlRegex = /^http:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
function main(page) {
    return __awaiter(this, void 0, void 0, function* () {
        if (urlRegex.test(page ? page : '')) {
            return new Promise((resolve, reject) => {
                const ans = [];
                return http.request(page, { method: 'HEAD' }, (res) => {
                    const strs = [];
                    strs.push('Headers', JSON.stringify(res.headers).toString());
                    return res.on('data', (s) => {
                        //console.log('Data: ', s)
                        ans.push(s);
                    }).on('end', () => {
                        try {
                            //console.log('ANS: ', ans)
                            if (ans.length > 0) {
                                strs.push(JSON.parse(Buffer.concat(ans).toString()));
                            }
                            resolve(JSON.stringify(strs));
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                }).on('error', (err) => {
                    reject(err);
                }).end();
            });
        }
        else {
            return Promise.resolve().then(() => 'URL Invalida');
        }
    });
}
module.exports = main;
