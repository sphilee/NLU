function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}
let x = [10083,105315,13195,17330,19590,20297,3224,34970,35472,39023,43003,44563,50740,52668,53758,59212,64986,65743,66790,82877,84313,86060];
let y = [10083,22451,28691,33252,35472,38346,43003,44563,47700,50256,52357,57460,59212,61486,64986,66790,67326,80709,84253,84313,87352,93079];
console.log(intersect(x, y));