const { SSL_OP_NETSCAPE_CA_DN_BUG } = require('constants');
var fs = require('fs');

/*
//readFIleSync
console.log('A');
var result = fs.readFileSync('C:/workspace/nodejs/syntax/sample.txt','utf8');
console.log(result);
console.log('C');
*/

//readfile
var result;
console.log('A');
fs.readFile('C:/workspace/nodejs/syntax/sample.txt','utf8',function(err, result){
    console.log(result);
});
console.log(result);
console.log('C');
