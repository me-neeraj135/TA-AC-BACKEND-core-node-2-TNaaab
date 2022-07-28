let http = require(`http`);
let fs = require(`fs`);
let url = require(`url`);
let qs = require(`querystring`);
let path = require(`path`);

let userPath = path.join(__dirname, `/users/`);

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let parseUrl = url.parse(req.url, true);
  let store = ``;

  req.on(`data`, chunk => {
    store += chunk;
  });

  req.on(`end`, () => {
    if (req.url === `/users` && req.method === `POST`) {
      let parseData = JSON.parse(store);
      let username = parseData.username;

      fs.open(userPath + username + `.json`, `wx`, (err, fd) => {
        if (err) return console.log(err);

        fs.writeFile(fd, store, err => {
          if (err) return console.log(err);
          fs.close(fd, err => {
            return console.log(`${username} created successfully`);
          });
        });
      });
    } else if (parseUrl.pathname === `/users` && req.method === `GET`) {
      let username = parseUrl.query.username;
      fs.readFile(userPath + username + `.json`, (err, content) => {
        if (err) return console.log(err);

        res.setHeader(`Content-type`, `applications/jason`);
        res.end(content);
      });
    } else if (parseUrl.pathname === `/users` && req.method === `PUT`) {
      let parseData = JSON.parse(store);
      let username = parseData.username;
      fs.open(userPath + username + `.json`, `r+`, (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, err => {
          if (err) return console.log(err);

          fs.writeFile(fd, store, err => {
            if (err) return console.log(err);
            fs.close(fd, err => {
              if (err) return console.log(err);
              return console.log(`${username} successfully updated`);
            });
          });
        });
      });
    } else if (parseUrl.pathname === `/users` && req.method === `DELETE`) {
      let username = parseUrl.query.username;

      fs.unlink(userPath + username + `.json`, err => {
        if (err) return console.log(err);
        return console.log(`${username} removed successfully`);
      });
    } else {
      res.statusCode = 404;
      res.end(`page not found`);
    }
  });
}

server.listen(4000, () => {
  console.log(`server listening on port 4000`);
});
