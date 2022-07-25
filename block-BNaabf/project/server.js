let http = require(`http`);
let fs = require(`fs`);
let url = require(`url`);
let qs = require(`querystring`);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = ``;
  req.on(`data`, chunk => {
    store += chunk;
  });

  req.on(`end`, () => {
    if (req.method === `GET` && req.url === `/form`) {
      res.setHeader(`content-type`, `text/html`);
      fs.createReadStream(`./form.html`).pipe(res);
    }
    if (req.method === `GET` && req.url.split(`.`).pop() === `css`) {
      res.setHeader(`content-type`, `text/css`);
      fs.createReadStream(`./style.css`).pipe(res);
    }
    if (req.method === `POST` && req.url === `/form`) {
      let parseData = qs.parse(store);
      res.setHeader(`content-type`, `text/html`);
      res.end(
        `<h2> name:${parseData[`name`]}</h2><br><p>email:${
          parseData[`email`]
        }</p><br><p>Age:${parseData[`Age`]}</p>`
      );
    }
  });
}

server.listen(5678, () => {
  console.log(`server listening on port:5678`);
});
