let { EventEmitter } = require(`events`);
let myEventEmitter = new EventEmitter();

let http = require(`http`);

let fs = require(`fs`);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.writeHead(200, { ContentType: `text/plain` });

  fs.createReadStream(`./readme.txt`).pipe(res);
}

server.listen(5000, () => {
  console.log(`server listening on port 5000`);
});

// myEventEmitter.on(`notice`, () => {
//   console.log(`emit event is noticed`);
// });

// myEventEmitter.emit(`notice`);

// myEventEmitter.on(`emitCalled`, msg => {
//   console.log(msg);
// });

// myEventEmitter.emit(`emitCalled`, `hello emit called`);
