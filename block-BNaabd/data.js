let http = require(`http`);
let qs = require(`querystring`);
let url = require(`url`);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let dataFormate = req.headers[`content-type`];
  let store = ``;

  req.on(`data`, chunk => {
    store += chunk;
  });

  req.on(`end`, () => {
    if (req.method === `POST` && req.url === `/json`) {
      let parseData = JSON.parse(store);
      res.setHeader(`content-type`, `application/json`);
      res.end(store);
    }
    if (req.method === `POST` && req.url === `/form`) {
      let parseData = qs.parse(store);
      res.end(JSON.stringify(parseData));
    }
  });
}

server.listen(7000, () => {
  console.log(`server listen on port:7000`);
});
