import {expect, test} from "@jest/globals";

test('Respuesta servidor Cliente', async () => {
    const mod = require('./UDPServer')
    const ans = await mod.client(9876)

    expect(ans).toMatch(/abril/)
}, 3000)
