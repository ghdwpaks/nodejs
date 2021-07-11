var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring')
var router = require("./router.js")

var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));
var db = require('./db.js');

exports.loginpage = function(request,response) {
    console.log("login loginpage 진입함")
    var title = 'LOGIN';
    var list = "";
    var html = template.HTML('/',title,list,`
        <form action="/login/login_process" method="post">
        <p><input type="text" name="id" placeholder="아이디"></p><p><input type="text" name="pw" placeholder="비밀번호"></p>
        <p>
            <input type="submit" value="로그인하기">
        </p>
        </form>
        `,
        ``);
    response.writeHead(200);
    response.end(html);
}

exports.loginprocess = function(request,response) {
    console.log("login loginpage 진입함")
    var post = request.body;
    console.log("loginprocess post :",post)
    var UserInputId = post["id"];
    console.log("loginprocess UserInputId :",UserInputId)
    var UserInputPw = post["pw"];
    console.log("loginprocess UserInputPw :",UserInputPw)

    db.query(`SELECT * FROM users`,function(error,user_list){
        console.log("loginprocess user_list",user_list)
        var i = 0
        //console.log("user_list[i]['username'] :",user_list[i]["username"])
        while(i<user_list.length) {
            if( UserInputId == user_list[i]["user_id"]) {
                /*
                console.log("아이디 일치 확인됨.")
                console.log("if 문 내부 UserInputId ",UserInputId)
                console.log("if 문 내부 user_list[i]['username']",user_list[i]
                ["username"])
                */
                if(UserInputPw == user_list[i]["user_password"]) {
                    /*
                    console.log("비밀번호 일치 확인됨")
                    console.log("if 문 내부 UserInputPw ",UserInputPw)
                    console.log("if 문 내부 user_list[i]['password']",user_list[i]["password"])
                    */
                    console.log("이제 사용자에게 세션을 제공해야합니다.")
                    //login.loginpage(request,response); 
                    db.query(`SELECT * FROM users WHERE user_id = (?);`,[UserInputId],function(error,userdata){
                        console.log("login loginprocess userdata :",userdata)
                        if(error) {
                            throw error;
                        }
                        console.log("login loginprocess usernumber[0]['user_number'] :",userdata[0]['user_number'])
                        console.log("login loginprocess usernumber[0]['user_name'] :",userdata[0]['user_name'])
                        router.serve_login_session_data(request,response,userdata[0]['user_number'],userdata[0]['user_name'])
                        //console.log("loginprocess request.session.id             :",request.session.id)
                    });
                }
            }
            i++;

        }
        //console.log("loginprocess i :",i)


      response.writeHead(302,{location:`/`});
      response.end();
    });
}
