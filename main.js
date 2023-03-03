const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/upload' && req.method === 'POST') {
    const fileStream = fs.createWriteStream('uploaded_file.txt', { flags: 'a' });
    req.on('data', (chunk) => {
      fileStream.write(chunk);
    });
    req.on('end', () => {
      fileStream.end();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File uploaded successfully!');
    });
  } else if (req.url === '/download' && req.method === 'GET') {
    const fileStream = fs.createReadStream('uploaded_file.txt');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fileStream.pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
