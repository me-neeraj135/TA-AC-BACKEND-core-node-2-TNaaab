// #### path

let path = require(`path`);
let indexRelativePath = `./../client/index.js`;

let indexAbsPath = path.join(__dirname, indexRelativePath);

console.log(indexAbsPath);

// #### server
