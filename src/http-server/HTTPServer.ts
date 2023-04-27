import type {IncomingMessage, RequestListener} from "http";

const http = require('http')
const fs = require('fs').promises


const requestListener: RequestListener = (req: IncomingMessage, res) => {
    const uri = new URL(req.url ? req.url : '' , `http://${req.headers.host}`);
    switch (uri.pathname) {
        case ("/save"):
            //fs.writeFile(__dirname + "/res.txt", JSON.stringify(req.))
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200)
         //   res.end(JSON.stringify(uri.searchParams.toString()))
            const save = {
                f1: uri.searchParams.get('f1'),
                f2: uri.searchParams.get('f2'),
                f3: uri.searchParams.get('f3'),
                f4: uri.searchParams.get('f4'),
                f5: uri.searchParams.get('f5'),
            }
            fs.writeFile(__dirname + "/res.txt", JSON.stringify(save))
            res.end('Respuesta guardada <br> <a href="/">Inicio</a>');
            break
        default:
            fs.readFile(__dirname + "/index.html").then((c) => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200)
                fs.readFile(__dirname + "/res.txt").then((zx) => {
                    res.end(c.toString().replace(/MARK/g, zx.toString().replace(",", ",\n")))
                }).catch(e => {
                    res.end(c.toString().replace(/MARK/g, "No hay resultados Guardados"))
                })
            })
            break
    }
}
function server(port: number = 8008, host: string = '0.0.0.0') {
    const server = http.createServer(requestListener)
    server.listen(port, host, () => {
        console.log(`Servidor activo en: ${host}:${port}`)
    })

}

server()