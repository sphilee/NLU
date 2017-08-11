const fs = require('fs');
const json2csv = require('json2csv');
let jsonNlu = fs.readFileSync('./article/results.txt', 'utf8').split('\n');
let jsonNlu2 = fs.readFileSync('./article/results2.txt', 'utf8').split('\n');
let jsonNlu3 = fs.readFileSync('./article/results3.txt', 'utf8').split('\n');
let jsonNlu4 = fs.readFileSync('./article/results4.txt', 'utf8').split('\n');
let jsonNlu5 = fs.readFileSync('./article/results5.txt', 'utf8').split('\n');
let jsonNlu6 = fs.readFileSync('./article/results6.txt', 'utf8').split('\n');
let jsonNlu7 = fs.readFileSync('./article/results7.txt', 'utf8').split('\n');
let jsonNlu8 = fs.readFileSync('./article/results8.txt', 'utf8').split('\n');
let result = jsonNlu.concat(jsonNlu2, jsonNlu3, jsonNlu4, jsonNlu5, jsonNlu6, jsonNlu7, jsonNlu8);
const getIndicesOf = (searchStr, str, caseSensitive) => {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index, indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
};
const search = (file, target, i) => {
  let len = file.length;
  let cnt = 0;
  let cateList = [];
  let sortable = [];
  let indexList = [];
  let start = new Date();

  for (let x = 0; x < len; x++) {
    let Attr = JSON.parse(file[x]);
    Attr.limitKeyword = 0;
    Attr.limitCategorie = 0;
    Attr.core = false;
    for (let y in target.keywords) {
      Attr.limitKeyword += getIndicesOf(target.keywords[y], Attr.text, false).length;
      Attr.limitKeyword += getIndicesOf(target.keywords[y], Attr.title, false).length;
    }
    for (let y in Attr.categories) {
      for (let z in target.categories) {
        if (Attr.categories[y].label.indexOf(target.categories[z]) != -1)
          Attr.limitCategorie += 1;
      }
    }
    if (getIndicesOf(target.keywords[0], Attr.text, false).length > 0)
      Attr.core = true;
    if (Attr.limitCategorie >= target.limitCategorie && Attr.core && Attr.limitKeyword >= target.limitKeyword) {
      cnt++;
      for (let y in Attr.categories) {
        if ("/travel/tourist destinations/japan" != Attr.categories[y].label)
          cateList.push(Attr.categories[y].label);
      }
      indexList.push(Attr.index);
    }
  }
  indexList.sort(function (a, b) {
    return a - b;
  });

  let counts = {};
  cateList.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  for (let cate in counts) {
    sortable.push([cate, counts[cate]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  let end = new Date();
  let sec = (end - start) / 1000;
  console.log(sec);

  myAnalyze[i] = {
    "condition": "limitKeyword >= " + target.limitKeyword + " && limitCategorie >= " + target.limitCategorie,
    "targetKeywords": target.keywords,
    "targetCategories": target.categories,
    "cnt": cnt,
    "topCategories": sortable.slice(0, 3),
    "index": indexList
  };

}

let target = [{
  keywords: ["gold", "price", "rise"],
  categories: ["/business and industrial/energy/oil/oil and gas prices", "/finance/investing/stocks", "/law, govt and politics/government"],
  limitKeyword: 25,
  limitCategorie: 0
}, {
  keywords: ["gold", "price", "rise"],
  categories: ["/business and industrial/energy/oil/oil and gas prices", "/finance/investing/stocks", "/law, govt and politics/government"],
  limitKeyword: 22,
  limitCategorie: 0
}];
let myAnalyze = [];

for (let i in target)
  search(result, target[i], i);

const csv = json2csv({
  data: myAnalyze,
  fields: ["condition", "targetKeywords", "targetCategories", "cnt", "topCategories", "index"]
});
fs.writeFile('./results/temp.csv', csv, 'utf8', function (err) {
  if (err) throw err;
  console.log('file saved');
});