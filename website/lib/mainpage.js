var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');


exports.home = function(request,response) {
    console.log("mainpage home 진입함")
    var title = 'HOMEPAGE';
    var add1 = ``
    if (request.session.id === undefined) {
        add1=`<br><h1><a href="${'/login'}">GO TO LOGIN</a></h1>`
    } else {
        add1=`<br><h2>환영합니다. ${request.session.user_id}!</h2>`
    }
    var description = `<h1><a href="${'/ideanote'}">GO TO IDEANOTE</a></h1>`+add1+`<br><h1><a href="${'/user/creating_user'}">GO TO CREATE USER</a></h1>`;
    var html = template.HTML("/",title,description,"","");
    response.writeHead(200);
    response.end(html);
}