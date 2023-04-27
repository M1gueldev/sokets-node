import {RemoteInfo} from "dgram";

const udp = require('dgram');

function UDPServer(puerto: number) {
    var server = udp.createSocket('udp4');

    server.on('error', function (error) {
        console.log('Error: ' + error);
        server.close();
    });

    server.on('message', function (msg: Buffer, info: RemoteInfo) {
        const fecha = new Date(Date.now())
            .toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        const ans = `Fecha: ${fecha} \nIP: ${info.address} \nPuerto: ${info.port}`

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

function UDPCLient(puerto, direccion:string = '0.0.0.0') {

    const client = udp.createSocket('udp4');
    const data = Buffer.from('ping');

    client.on('message', function (msg, info) {
        console.log('Mensaje del servidor: \n' + msg.toString());
        client.close();
    });

    client.send(data, puerto, direccion, function (error) {
        if (error) {
            client.close();
        } else {
            console.log('Mensaje Enviado');
        }
    });
}

module.exports = {
    server: UDPServer,
    client: UDPCLient
}