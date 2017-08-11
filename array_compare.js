const fs = require('fs');
let a = new Set([766,1715,1941,4170,4554,4777,8056,8461,13157,13317,13800,14311,19681,21503,29248,36036,42511,44892,46741,49120,51510,52593,53057,56748,61118,63696,70097,80198,83075,86167,87426,87560,92948,93268,93817,94074,95202,97374,100106,101737,102673,102899,103038,103594,103839,104045,104508,104509,109273]);
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