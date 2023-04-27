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
const udp = require('dgram');
function UDPServer(puerto) {
    var server = udp.createSocket('udp4');
    server.on('error', function (error) {
        console.log('Error: ' + error);
        server.close();
    });
    server.on('message', function (msg, info) {
        const fecha = new Date(Date.now())
            .toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const ans = `Fecha: ${fecha} \nIP: ${info.address} \nPuerto: ${info.port}`;
        server.send(ans, info.port, info.address, function (error) {
            console.log('Mensaje Enviado !!!');
            server.close();
        });
    });
    server.on('listening', function () {
        const address = server.address();
        const port = address.port;
        const ipaddr = address.address;
        console.log('Server activo en puerto: ' + port);
        console.log('Server ip :' + ipaddr);
    });
    server.on('close', function () {
        console.log('Servidor Cerrado !');
    });
    server.bind(puerto);
}
function UDPCLient(puerto, direccion = '0.0.0.0') {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const client = udp.createSocket('udp4');
            const data = Buffer.from('ping');
            client.on('message', function (msg, info) {
                console.log('Mensaje del servidor: \n' + msg.toString());
                resolve(msg.toString());
                client.close();
            });
            client.on('error', (e) => {
                reject(e);
                client.close();
            });
            client.send(data, puerto, direccion, function (error) {
                if (error) {
                    client.close();
                }
                else {
                    console.log('Mensaje Enviado');
                }
            });
        });
    });
}
module.exports = {
    server: UDPServer,
    client: UDPCLient
};
