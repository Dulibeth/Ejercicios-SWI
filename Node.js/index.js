const config = require('./package.json').config;
const http = require('http');
const os = require('os');
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, World!</h1>');
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Servidor iniciado en http://127.0.0.1:${port}/`);
  
function printInfo() {
    if (config.showSystemInfo) {
        console.log('Node.js versión:', process.version);
        console.log('Sistema operativo:', os.platform(), os.release());
    }

    if (config.showCPUUsage) {
        console.log('Uso de CPU: ', process.cpuUsage() / 1000,'ms');
    }

    if (config.showMemoryUsage) {
        console.log(`Uso de memoria: `, process.memoryUsage(), '%');
    }

    if (config.showSystemUptime) {
        console.log('Tiempo activo del sistema: ', os.uptime(),'segundos');
    }

    if (config.showNodeUptime) {
        console.log('Tiempo de ejecución de Node.js: ', process.uptime(), 'segundos\n');
    }
}

    setInterval(() => {
        printInfo();
    }, config.intervalSeconds * 1000);
});
