const fs = require('fs');

let urlList = [3224,80709];

let jsonNlu = fs.readFileSync('./article/results.txt', 'utf8').split('\n');
let jsonNlu2 = fs.readFileSync('./article/results2.txt', 'utf8').split('\n');
let jsonNlu3 = fs.readFileSync('./article/results3.txt', 'utf8').split('\n');
let jsonNlu4 = fs.readFileSync('./article/results4.txt', 'utf8').split('\n');
let jsonNlu5 = fs.readFileSync('./article/results5.txt', 'utf8').split('\n');
let jsonNlu6 = fs.readFileSync('./article/results6.txt', 'utf8').split('\n');
let jsonNlu7 = fs.readFileSync('./article/results7.txt', 'utf8').split('\n');
let jsonNlu8 = fs.readFileSync('./article/results8.txt', 'utf8').split('\n');
let result = jsonNlu.concat(jsonNlu2, jsonNlu3, jsonNlu4, jsonNlu5, jsonNlu6, jsonNlu7, jsonNlu8);

let len = result.length;
for (let x = 0; x < len; x++) {
  let Attr = JSON.parse(result[x]);
  for (let y in urlList) {
    if (Attr.index == urlList[y]) {
      console.log(Attr.url);
    }

  }
}