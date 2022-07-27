let http = require(`http`);
let fs = require(`fs`);
let url = require(`url`);
let qs = require(`querystring`);
let path = require(`path`);

let userDir = path.join(__dirname, `/users`);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = ``;
  let userName = JSON.parse(store).username;

  req.on(`data`, chunk => {
    store += chunk;
  });

  req.on(`end`, () => {
    if (req.method === `GET` && req.url === `/user`) {
      res.setHeader(`content-type`, `text/html`);
      fs.createReadStream(`./index.html`).pipe(res);
    } else if (req.method === `POST` && req.url === `/index`) {
      let parseData = qs.parse(store);
      fs.open(userDir + userName, +`.json`, `wx`, (err, content) => {
        if (err) throw err;
        res.setHeader(`content-type`, `/html`);
        fs.createReadStream(`./index.html`).pipe(res);
        console.log(`saved`);
        text;
      });
    }
  });
}

server.listen(4000, () => {
  console.log(`server listening on port 4000`);
});
