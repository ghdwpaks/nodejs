var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');


exports.home = function(request,response) {
    console.log("mainpage home 진입함")
    var title = 'HOMEPAGE';
    var add1 = ``
    var add2 = ``
    var add3 = ``
    console.log("mainpage request.session :",request.session)
    console.log("mainpage request.session.user_id :",request.session.user_id)
    console.log("mainpage request.session.user_number :",request.session.user_number)
    if (request.session.user_id === undefined) {
        add1=`<br><h1><a href="${'/login'}">GO TO LOGIN</a></h1>`
        add2=`<br><h1><a href="${'/user/creating_user'}">GO TO CREATE USER</a></h1>`
    } else {
        add1=`<br><h2>환영합니다. ${request.session.user_name}!</h2>`+`<br><h3><a href="/logout">GO TO LOGOUT</a><h3>`
        add3=`<h1><a href="${'/ideanote'}">GO TO IDEANOTE</a></h1>`
    }
    var description = add3+add1+add2;
    var html = template.HTML("/",title,description,"","");
    response.writeHead(200);
    response.end(html);
}