const net = require('net');

const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on("data", data => {
    c.write(Buffer.concat([Buffer.from("response: "), data]))
  })
  c.write('hello\r\n');
});

server.on('error', (err) => {
  throw err;
});

server.listen(8124, () => {
  console.log('server bound');
});