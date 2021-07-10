var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');


exports.home = function(request,response) {
    console.log("mainpage home 진입함")
    var title = 'HOMEPAGE';
    var description = `<h1><a href="${'/ideanote'}">GO TO IDEANOTE</a></h1>`+`<br><h1><a href="${'/login'}">GO TO LOGIN</a></h1>`+`<br><h1><a href="${'/user/creating_user'}">GO TO CREATE USER</a></h1>`;
    var html = template.HTML("/",title,description,"","");
    response.writeHead(200);
    response.end(html);
}