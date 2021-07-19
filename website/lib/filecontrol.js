var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'ghdwpaks',
    password : 'ghd0327',//1 * 6
    database : 'ghdweb',
    multipleStatements : true
  });
db.connect();
var template = require('./template.js');
var qs = require('querystring')
var router = require("./router.js")

var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));
//var db = require('./db.js');

var multer_module = require('multer');
var upload_module = multer_module({dest:'uploads/'})

exports.mainpage = function(request,response) {
    
    console.log("filecontrol mainpage 에 진입하였습니다.")
    console.log("filecontrol mainpage request session :",request.session)


    db.query(`SELECT * FROM filetable;SELECT * FROM users;`,function(error,file_titles){
        if(error) {
            console.log("에러 발생 지점 3");
            console.log("error :",error)
        }
        console.log("filecontrol mainpage else file_titles :",file_titles)



        var title = 'FILEPAGE';
        var list = template.filelist(file_titles);
        //var adds_html1 = `<h1><a href="/ideanote/create">create</a></h1>`;
        var adds_html1 = ``;
        if (request.session.user_id != undefined) {
            adds_html1 = `<h1><a href="/ideanote/create">create</a></h1>`;
        }
        var html = template.HTML('/',title,list,'',adds_html1);
        response.writeHead(200);
        response.end(html);
    });
    
}



exports.showdetails = function(request,response,ShowTargetId) {
    console.log("filecontrol showdetails 에 진입하였습니다.")
    console.log("filecontrol showdetails request session :",request.session)
    console.log("filecontrol showdetails ShowTargetId :",ShowTargetId)

    console.log("file.js uploadpage 진입함")
    var title = 'Upload';
    var list = "";
    var html;
    db.query(`SELECT * FROM filetable WHERE file_number = ${ShowTargetId};`,function(error,datas){
        console.log("filecontrol showdetails datas :",datas)
        console.log("filecontrol showdetails datas[0] :",datas[0])
        console.log("filecontrol showdetails datas[0]['file_title'] :",datas[0]["file_title"])
        var canpass = false;
        console.log("filecontrol showdetails datas[0]['file_public_able'] == 'no' :",datas[0]["file_public_able"] == "no")
        if(datas[0]["file_public_able"] == "no") {
            console.log("filecontrol showdetails datas[0]['file_creaternumber'] == request.session.user_number :",datas[0]["file_creaternumber"] == request.session.user_number)
            if(datas[0]["file_creaternumber"] == request.session.user_number) {
                console.log("접근이 허가되었습니다.")
                canpass = true;
            }
        } else {
            canpass = true;
        }

        if (canpass) {
            InShowdetailsCreaterNumber = datas[0]["file_creaternumber"]
            db.query(`SELECT * FROM users WHERE user_number = ${InShowdetailsCreaterNumber}`,function(error,datas2){
                console.log("filecontrol showdetails data2 :",datas2)
                var adds_html1 = `<table border="1">
                <tr><td>작성자</td><td>${datas2[0]["user_name"]}</td></tr>
                <tr><td>제목</td><td>${datas[0]["file_title"]}</td></tr>
                <tr><td>내용</td><td>${datas[0]["file_content"]}</td></tr>
                <tr><td>파일</td><td>${datas[0]["file_filename"]}</td></tr>
                </table>
                `;
                
                html = template.HTML('/',title,list,'',adds_html1);
                response.writeHead(200);
                response.end(html);
            });
        } else {
            response.end("<script>alert('Entry denied');location.href='/filepage';</script>");
        }
    });

}

exports.uploadpage = function(request,response) {
    console.log("filecontrol mainpage 에 진입하였습니다.")
    console.log("filecontrol mainpage request session :",request.session)

    console.log("file.js uploadpage 진입함")
    var title = 'Upload';
    var list = "";
    var html = template.HTML('/',title,list,`
        <form action="/upload_process" method="post" enctype="multipart/form-data">
        <p><input type="text" name="title" placeholder="제목"></p>
        <p><input type="text" name="textcont" placeholder="내용"></p>
        <p><input type="file" name="userfile"></p>
        <label><input type="radio" name="public_show" value="yes" checked> 공개</label>
        <label><input type="radio" name="public_show" value="no"> 비공개</label>
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
    var public_show = request.body["public_show"]
    console.log("filecontrol uploadprocess public_show :",public_show)
    
    console.log("삽입될 쿼리문 :",`INSERT INTO filetable ( file_creaternumber,file_title,file_content,file_filename) VALUES (${creaternumber},${title},${content},${filename});`)
    db.query(`INSERT INTO filetable ( file_creaternumber,file_title,file_content,file_filename,file_public_able) VALUES (${creaternumber},"${title}","${content}","${filename}","${public_show}");`,function(error,result){
        if(error) {
            throw error;
        }
        console.log("filecontrol uploadprocess request session point 2 :",request.session)
        console.log("이제 사용자를 홈으로 내보내야합니다.")
        //response.end("<script>alert('sucess to insert file');location.href='/';</script>");
        //위에 명령어를 이용하면 세션이 지워지는거같음
        response.writeHead(302,{location:`/filepage`});
        response.end();
    })
    
}
