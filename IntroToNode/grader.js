var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

function average(s) {
    var tot = 0;
    // var avg;
    for (var i = 0; i < s.length; i++) {
        tot += s[i];
    }
    return Math.ceil(tot / s.length);
}


console.log(average(scores));