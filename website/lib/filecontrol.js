var mysql = require('mysql');

var template = require('./template.js');
var qs = require('querystring')
var router = require("./router.js")
var fs = require("fs");
var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));
var db = require('./db.js');

var multer_module = require('multer');
var upload_module = multer_module({dest:'uploads/'})

exports.mainpage = function(request,response) {
    

    if (request.session.user_id === undefined) {
        db.query(`SELECT * FROM filetable WHERE file_public_able = "yes" ORDER BY file_number DESC;SELECT user_name , user_number FROM users;`,function(error,file_ops){
            console.log("filecontrol mainpage if true start point 1")
            var html = mainpage_part0_entered_code(request,response,error,file_ops)
            response.writeHead(200);
            response.end(html);
        });
    } else {
        db.query(`SELECT * FROM filetable WHERE file_creaternumber = ${request.session.user_number} or file_public_able = "yes" ORDER BY file_number DESC;SELECT user_name , user_number FROM users;`,function(error,file_ops){
            var html = mainpage_part0_entered_code(request,response,error,file_ops)
            response.writeHead(200);
            response.end(html);
        });
    }
}

function mainpage_part0_entered_code( request,response, error,file_ops) {
    if(error) {
        console.log("에러 발생 지점 3");
        console.log("error :",error)
    }
    var title = 'FILEPAGE';
    var username_list = mainpage_part1_setting_creatername(file_ops);
    var show_public_ops = mainpage_part2_setting_showpublic(file_ops);
    
    
    var list = template.filelist(file_ops[0],username_list,show_public_ops);
    var adds_html1 = ``;
    if (request.session.user_id != undefined) {
        adds_html1 = `<h1><a href="/filepage/create">create</a></h1>`;
    }
    var html = template.HTML('/',title,list,'',adds_html1);
    return html;

}

function mainpage_part1_setting_creatername(username_list) {
    var creatername_list = [];
    for (var i = 0; i < username_list[0].length; i++) {
        for (var j = 0; j < username_list[1].length; j++) {
            if(username_list[0][i]["file_creaternumber"] == username_list[1][j]["user_number"]) {
                creatername_list.push(username_list[1][j]["user_name"])
            }
        }
    }
    return creatername_list;
}

function mainpage_part2_setting_showpublic(file_ops) {
    var show_public_ops = []
    for(var i = 0; i < file_ops[0].length; i++) {
        //show_public_ops.push()
        if(file_ops[0][i]["file_public_able"] == "yes") {
            show_public_ops.push("공개")
        } else {
            show_public_ops.push("비공개")
        }
    }

    return show_public_ops;
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
                <tr><td>파일</td><td><a href="/filepage/downloadprocess/${datas[0]["file_filename"]}">${datas[0]["file_filename"]}</a></td></tr>
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
        <form action="/filepage/upload_process" method="post" enctype="multipart/form-data">
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
    var creaternumber = request.session.user_number;
    var title = request.body["title"];
    var content = request.body["textcont"];
    var filename = request.file.filename;
    var public_show = request.body["public_show"]
    
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

exports.downloadprocess = function(request,response,DownloadTargetName){
    console.log("filecontrol downloadprocess DownloadTargetName :",DownloadTargetName)
    var DownloadFileStoragePath = "./files/"
    var DownloadFileFullPath =  DownloadFileStoragePath+DownloadTargetName;
    var DownloadTargetType = String(DownloadTargetName).split(".")[1];
    console.log("1")
    console.log("filecontrol downloadprocess DownloadTargetName :",DownloadTargetName);
    console.log("filecontrol downloadprocess DownloadTargetType :",DownloadTargetType);
    console.log("filecontrol downloadprocess DownloadFileFullPath :",DownloadFileFullPath);

    response.setHeader('Content-disposition','attachment; filename='+DownloadTargetName);
    response.setHeader('Content-type',DownloadTargetType);
    var filestream = fs.createReadStream(DownloadFileFullPath);
    filestream.pipe(response);
    console.log("1")

    console.log("filecontrol downloadprocess DownloadFileFullPath :",DownloadFileFullPath)
    console.log("filecontrol downloadprocess request.session :",request.session)
    console.log("filecontrol downloadprocess request.session.user_id :",request.session.user_id)
    //if (request.session.user_id)
    //SELECT * FROM filetable WHERE file_filename = "filetarget1585330.png";
    db.query(`SELECT * FROM filetable WHERE file_filename = "filetarget1585330.png";`,function(error,result){
        if(error) {
            throw error;
        }
        console.log("filecontrol downloadprocess db result :",result)

        if(result[0]["file_public_able"] == "yes" ) {
            console.log("result[0]['file_public_able'] 1:" ,result[0]["file_public_able"])
            console.log("사용자에게 파일을 제공해도 괜찮습니다.")
            
            console.log("filecontrol downloadprocess DownloadTargetType :",DownloadTargetType);
            console.log("filecontrol downloadprocess DownloadTargetName :",DownloadTargetName);
            console.log("filecontrol downloadprocess DownloadFileFullPath :",DownloadFileFullPath);

            response.setHeader('Content-disposition','attachment; filename='+DownloadTargetName);
            response.setHeader('Content-type',DownloadTargetType);
            var filestream = fs.createReadStream(DownloadFileFullPath);
            filestream.pipe(response);

            //response.sendFile(DownloadFileFullPath)
        } else {
            console.log("result[0]['file_public_able'] 2:" ,result[0]["file_public_able"])
            if(result[0]["file_creaternumber"] == request.session.user_id) {
                console.log("result[0]['file_creaternumber'] == request.session.user_id :",result[0]["file_creaternumber"] == request.session.user_id)
                console.log("사용자에게 파일을 제공해도 괜찮습니다.")
                
            }
        }


        response.writeHead(302,{location:`/`});
        response.end();
    })
}

function downloadprocess_part1_get_download(request,response,DownloadFileFullPath) {
    
    return show_public_ops;
}
