function l(codes) {
    console.log(codes);
}
/*
function a() {
    l('a');
}
*/
var a = function() {
    console.log('A');
}
//a();
//l(a);

function slowfunc(callback) {
    callback();
}

slowfunc(a);