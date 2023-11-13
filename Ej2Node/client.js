const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const numWords = parseInt(parsedUrl.query.X) || 3; // Número de palabras, por defecto 3

    if (parsedUrl.pathname === '/') {
        const dictionaryPath = 'diccionario.txt';
        const dictionary = fs.readFileSync(dictionaryPath, 'utf-8').split('\n');

        const randomPassword = generateRandomPassword(numWords, dictionary);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>Contraseña aleatoria:</h1><p>${randomPassword}</p>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});

function generateRandomPassword(numWords, dictionary) {
    const passwordWords = [];
    for (let i = 0; i < numWords; i++) {
        const randomIndex = Math.floor(Math.random() * dictionary.length);
        passwordWords.push(dictionary[randomIndex].trim());
    }
    return passwordWords.join('');
}

const port = 3000;

server.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
