import {describe, expect} from "@jest/globals";

const URL = 'http://www.testingmcafeesites.com/';
const URLError = 'http://google.com';
const URLInvalid = 'https://google.com';
test('Should get HEAD from URL', async () => {
    const http = require('./HTTPClient')
    expect.assertions(3)
    const a = await  http(URL)
    const b = await  http(URLError)
    const c = await  http(URLInvalid)
    await  expect(a).toMatch(/ASP/)
    await  expect(b).toMatch(/UTF-8/)
    await  expect(c).toMatch(/URL Invalida/)
})