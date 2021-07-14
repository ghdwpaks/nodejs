var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring')
var router = require("./router.js")

var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));
var db = require('./db.js');

var multer_module = require('multer');
var upload_module = multer_module({dest:'uploads/'})


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
    console.log("filecontrol uploadprocess request session :",request.session)
    console.log("filecontrol uploadprocess request body :",request.body)
    //console.log("request :",request)
    //console.log("main app post upload process request",request)
    console.log("filecontrol uploadprocess request file :",request.file)
    console.log("filecontrol uploadprocess request body :",request.body)
    
    console.log()
    var creaternumber = request.session.user_number;
    console.log("filecontrol uploadprocess creaternumber :",creaternumber)
    var title = request.body["title"];
    console.log("filecontrol uploadprocess title :",title)
    var content = request.body["textcont"];
    console.log("filecontrol uploadprocess content :",content)
    var filename = request.file.filename;
    console.log("filecontrol uploadprocess filename :",filename)
    
    console.log("삽입될 쿼리문 :",`INSERT INTO filetable ( file_creaternumber,file_title,file_content,file_filename) VALUES (${creaternumber},${title},${content},${filename});`)
    db.query(`INSERT INTO filetable ( file_creaternumber,file_title,file_content,file_filename) VALUES (${creaternumber},"${title}","${content}","${filename}");`,function(error,result){
        if(error) {
            throw error;
        }
        console.log("이제 사용자를 홈으로 내보내야합니다.")
        response.end("<script>alert('success to join');location.href='/';</script>");
    })
    
}
