var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring')
var router = require("./router.js")

var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));
var db = require('./db.js');

exports.logout_process = function(request,response) {
    console.log("login loginpage 진입함")
    request.session.destroy(function(){
        request.session;
    });
    response.writeHead(302,{location:`/`});
    response.end();
}
