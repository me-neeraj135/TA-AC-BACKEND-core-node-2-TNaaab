let http = require(`http`);
let fs = require(`fs`);

let server = http.createServer(handleRequest);

let store = ``;
function handleRequest(req, res) {
  req.on(`data`, chunk => {
    store = store + chunk;
  });

  req.on(`end`, () => {
    res.write(store);
    res.end();
  });
}

server.listen(3456, () => {
  console.log(`server listening on 3456`);
});
