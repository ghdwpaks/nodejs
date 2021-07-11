var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring')

var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));


exports.creating_user = function(request,response) {
    console.log("users creating_user 진입함")
    var title = 'HOMEPAGE';
    var description = `<h1><a href="${'/ideanote'}">GO TO IDEANOTE</a></h1>`;
    var title = 'CREATE USER';
    var list = "";
    var html = template.HTML('/',title,list,`
        <form action="/user/creating_user_process" method="post">
        <p><input type="text" name="id" placeholder="아이디"></p>
        <p><input type="text" name="pw" placeholder="비밀번호"></p>
        <p><input type="text" name="username" placeholder="이름"></p>
        <p>
            <input type="submit" value="가입하기">
        </p>
        </form>
        `,
        ``);
    response.writeHead(200);
    response.end(html);
}
exports.creating_user_process = function(request,response) {
    var post = request.body;
    console.log("creating_user_process post :",post)
    db.query(`SELECT * FROM users`,function(erorr,user_list){

        /*
        var id = body.split("id=")[1].split("&")[0]
        var pw = body.split("id=")[1].split("&")[1].split("pw=")[1]
        console.log("id :",id)
        console.log("pw :",pw)
        console.log("user_list :",user_list)
        //console.log("sp :",user_list[0]["username"])
        */
        user_id_list = new Array()
        var id = post["id"]
        console.log("creating_user_process id :",id)
        var pw = post["pw"]
        console.log("creating_user_process pw :",pw)
        var username = post["username"]
        console.log("creating_user_process username :", username)

        console.log("before user_id_list :",user_id_list)
        var i = 0
        var pass = true
        while (i < user_list.length) {
            if (user_list[i]["user_id"] == id ) {
                console.log("in while id :",id)
                console.log("in while user_list[i]["+'user_id'+"] :",user_list[i]["user_id"])
                console.log("위와 같은 아이디 중복을 사유로 가입을 취소합니다.")

                pass = false
            }
            i++;
        }
        if (pass) {
            console.log("통과되었습니다.")
            //db.query(`INSERT INTO users (username,password) VALUES (?,?);`,[id,pw],function(error,result){
            db.query(`INSERT INTO users (user_id,user_password,user_name) VALUES (?,?,?);`,[id,pw,username],function(error,result){
                if(error) {

                    throw error;
                }
                console.log("이제 사용자를 홈으로 내보내야합니다.")
                response.end("<script>alert('success to join');location.href='/';</script>");
            })
        } else {
            //response.write("<script>alert('아이디 중복을 사유로 회원가입이 취소됐습니다.')</script>");
            //response.send("<script>alert('알림 창입니다.');location.href='/';</script>");
            //response.writeHead(302,{location:`/`});
            response.end("<script>alert('same ID. plz change it and try again');location.href='/';</script>");
        }
    
        
    })
    
}