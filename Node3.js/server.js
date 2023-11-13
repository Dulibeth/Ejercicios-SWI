const http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');

const targetUrl = 'https://www.nytimes.com/international/'; 
const downloadInterval = 60 * 60 * 1000; // Descargar cada 1 hora

const server = http.createServer(async (req, res) => {
  try {
    const html = await scrapeWebsite(targetUrl);
    const extractedData = extractData(html);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(extractedData));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error interno del servidor');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

// Descargar periódicamente el HTML
setInterval(async () => {
  try {
    const html = await scrapeWebsite(targetUrl);
    const extractedData = extractData(html);

    console.log('Datos extraídos:', extractedData);
  } catch (error) {
    console.error('Error al descargar y procesar:', error.message);
  }
}, downloadInterval);

async function scrapeWebsite(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
  });
  return response.data;
}

function extractData(html) {
  const $ = cheerio.load(html);
  const title = $('title').text();
  const metaDescription = $('meta[name="description"]').attr('content');

  return {
    title,
    metaDescription,
  };
}
