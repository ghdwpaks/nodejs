var testFolder = '../data/';
/*
var inputs = process.argv;
var path = inputs[2];
console.log(path);
*/
var fs = require('fs');
fs.readdir(testFolder, function(error, filelist) {
    console.log(filelist);
})
