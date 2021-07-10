var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring')

exports.creating_user = function(request,response) {
    console.log("users creating_user 진입함")
    var title = 'HOMEPAGE';
    var description = `<h1><a href="${'/ideanote'}">GO TO IDEANOTE</a></h1>`;
    var title = 'CREATE USER';
    var list = "";
    var html = template.HTML('/',title,list,`
        <form action="/user/creating_user_process" method="post">
        <p><input type="text" name="id" placeholder="아이디"></p><p><input type="text" name="pw" placeholder="비밀번호"></p>
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
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        db.query(`SELECT * FROM users`,function(erorr,user_list){
            var id = body.split("id=")[1].split("&")[0]
            var pw = body.split("id=")[1].split("&")[1].split("pw=")[1]
            console.log("id :",id)
            console.log("pw :",pw)
            console.log("user_list :",user_list)
            user_id_list = new Array()
            //console.log("sp :",user_list[0]["username"])
            
            console.log("before user_id_list :",user_id_list)
            var i = 0
            var pass = true
            while (i < user_list.length) {
                if (user_list[i]["username"] == id ) {
                    console.log("in while id :",id)
                    console.log("in while user_list[i]["+'username'+"] :",user_list[i]["username"])
                    console.log("위와 같은 아이디 중복을 사유로 가입을 취소합니다.")

                    pass = false
                }
                i++;
            }
            if (pass) {
                console.log("통과되었습니다.")
                db.query(`INSERT INTO users (username,password) VALUES (?,?);`,[id,pw],function(error,result){
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
    });
}