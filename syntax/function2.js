const { setupMaster } = require("cluster");

console.log(Math.round(1.4));
console.log(Math.round(1.6));
console.log(Math.round(1.5));

function sum(first, second) {
    return first+second;
}
var suma = sum(2,4);

console.log(Math.round(1.6));

function l(a) {
    console.log(a);
}
l(Math.round(1.6));

l(`suma = ${suma}`);



