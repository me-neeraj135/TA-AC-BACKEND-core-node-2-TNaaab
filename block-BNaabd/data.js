let http = require(`http`);
let qs = require(`querystring`);
let url = require(`url`);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let dataFormate = req.headers[`content-type`];
  let store = ``;
  console.log(dataFormate, req.url);

  if (req.method === `POST` && req.url === `/form`) {
    req.on(`data`, chunk => {
      store += chunk;
    });

    req.on(`end`, () => {
      if (dataFormate === `application/x-www-form-urlencoded`) {
        let parseData = qs.parse(store);
        res.end(JSON.stringify(parseData));
      }
    });
  } else if (req.method === `POST` && req.url === `/JSON`) {
    req.on(`data`, chunk => {
      store += chunk;
    });

    req.on(`end`, () => {
      if (dataFormate === `application/json`) {
        let parseData = JSON.parse(store);
        res.end(store);
      }
    });
  } else {
    res.writeHead(404, { ContentType: `text/html` });
    res.end(`<h2>page not found</h2>`);
  }
}

server.listen(7000, () => {
  console.log(`server listen on port:7000`);
});
