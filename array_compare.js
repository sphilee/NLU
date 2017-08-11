const fs = require('fs');
let a = new Set([367,3092,3224,6149,6544,8997,13195,13665,17330,19590,20297,21280,21373,26936,27210,30594,33616,34970,35744,39023,40473,49006,50740,50980,52668,53758,55208,61475,63126,65220,65727,65743,82877,84286,86060,93785,105307,105315,105316,105319]);
let b = new Set([3224,10083,13195,17330,19590,20297,34970,35472,39023,43003,44563,50740,52668,53758,59212,64986,65743,66790,82877,84313,86060,105315]);
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

fs.writeFile('./results/temp.txt', JSON.stringify(final), 'utf8', function (err) {
    if (err) throw err;
    console.log('file saved');
});