let path = require(`path`);

let serverPath = __filename;
let appPath = __dirname + `/app.js`;
let relativeIndexPath = `./index.html`;
let absoluteIndexPath = path.join(__dirname, `index.html`);

// console.log(relativeIndexPath);
// console.log(absoluteIndexPath);

// #### Capture data on server

let http = require(`http`);

let fs = require(`fs`);
let url = require(`url`);
let qs = require(`querystring`);

let server = http.createServer(handleRequest);
let store = ``;
function handleRequest(req, res) {
  let dataFormate = req.headers[`content-type`];
  console.log(dataFormate);

  req.on(`data`, chunk => {
    store += chunk;
  });

  req.on(`end`, () => {
    if (req.method === `POST` && req.url === `/`) {
      if (dataFormate === `application/json`) {
        let parseData = JSON.parse(store);
        let name = parseData[`name`];
        let email = parseData[`email`];

        res.writeHead(201, { ContentType: `text/html` });
        res.end(`<h1>${name}</h1><h2>${email}</h2>`);
      }
      if (dataFormate === `application/x-www-form-urlencoded`) {
        let parseData = qs.parse(store);
        let stfData = JSON.stringify(parseData);
        let email = parseData[`email`];
        res.writeHead(201, {
          ContentType: `text/html`,
        });
        res.end(`<h2>${email}</h2>`);
      }
    }
  });
}
server.listen(9000, () => {
  console.log(`server listening on port:9K`);
});
