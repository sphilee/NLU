const fs = require('fs');
let a = new Set([1715, 4170, 4777, 13317, 13800, 19681, 49120, 51510, 53057, 61118, 80198, 86167, 92948, 94074, 95202, 97374, 101737, 103038, 103839, 104045, 104509]);
let b = new Set([4170, 4554, 8461, 13157, 13317, 14311, 19681, 36036, 46741, 49120, 51510, 53057, 56748, 61118, 80198, 87426, 94074, 100106, 101737, 104045, 104509, 109273]);
let intersection = new Set(
    [...a].filter(x => b.has(x)));
let differenceA = new Set(
    [...a].filter(x => !b.has(x)));
let differenceB = new Set(
    [...b].filter(x => !a.has(x)));
let final = {
    intersection: Array.from(intersection),
    differenceA: Array.from(differenceA),
    differenceB: Array.from(differenceB),
}

fs.writeFile('./results/temp.txt', JSON.stringify(final), 'utf8', function (err) {
    if (err) throw err;
    console.log('file saved');
});