const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const rl = readline.createInterface({
  input: fs.createReadStream('./file/status.real')
});

let packageArr = [],
  packageObj = {},
  packageKey = '';

const resetPackageObj = () => {
  packageObj = {};
  packageKey = '';
};

rl.on('line', line => {
  let indexOfColon = line.indexOf(':'),
    lineKey = line.slice(0, indexOfColon).toLowerCase(),
    lineValue = line.slice(indexOfColon + 1).trim(),
    hasSpaceAtStart = /^\s/.test(line);

  if (line.length > 0 && !hasSpaceAtStart) {
    packageKey = lineKey;
    packageObj[lineKey] = lineValue;
  } else if (hasSpaceAtStart) {
    packageObj[packageKey] += line;
  } else if (line.length === 0) {
    packageArr.push(packageObj);
    resetPackageObj();
  }
});

rl.on('close', () => {
  packageArr.sort((a, b) =>
    a.package > b.package ? 1 : b.package > a.package ? -1 : 0
  );
});

app.get('/api/packages', (req, res) => {
  res.status(200).send(packageArr);
});

const port = 3000,
  host = '0.0.0.0';

app.listen(port, host, () =>
  console.log(`Backend listening to port: ${port}!`)
);
