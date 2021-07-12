var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring')
var router = require("./router.js")

var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));
var db = require('./db.js');


exports.uploadpage = function(request,response) {
    console.log("file.js uploadpage 진입함")
    var title = 'Upload';
    var list = "";
    var html = template.HTML('/',title,list,`
        <form action="/upload_process" method="post" enctype="multipart/form-data">
        <p><input type="text" name="title" placeholder="제목"></p>
        <p><input type="text" name="textcont" placeholder="내용"></p>
        <p><input type="file" name="userfile"></p>
        <p>
            <input type="submit" value="업로드하기">
        </p>
        </form>
        `,
        ``);
    response.writeHead(200);
    response.end(html);
}

exports.uploadprocess = function(request,response) {
    console.log("filecontrol uploadprocess 에 진입하였습니다.")
    console.log("request :",request)


}