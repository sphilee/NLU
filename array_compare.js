const fs = require('fs');
let a = new Set([3224, 10083, 13195, 17330, 19590, 20297, 34970, 35472, 39023, 43003, 44563, 50740, 52668, 53758, 59212, 64986, 65743, 66790, 82877, 84313, 86060, 105315]);
let b = new Set([10083, 22451, 28691, 33252, 35472, 38346, 43003, 44563, 47700, 50256, 52357, 57460, 59212, 61486, 64986, 66790, 67326, 80709, 84253, 84313, 87352, 93079]);
let intersection = new Set(
    [...a].filter(x => b.has(x)));
let differenceA = new Set(
    [...a].filter(x => !b.has(x)));
let differenceB = new Set(
    [...b].filter(x => !a.has(x)));
let final = {
    intersection:Array.from(intersection),
    differenceA:Array.from(differenceA),
    differenceB:Array.from(differenceB),
}
console.log(final);

fs.writeFile('./results/temp.txt', JSON.stringify(final), 'utf8', function (err) {
    if (err) throw err;
    console.log('file saved');
});