var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');


exports.home = function(request,response) {
    db.query(`SELECT * FROM ideanote`,function(error,ideas){
        var title = 'welcome';
        var description = "hello, node.js";
        var list = template.list(ideas);
        var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(html);
    });
}
exports.create = function(request,response) {
    db.query(`SELECT * FROM ideanote`,function(error,ideas){
        //console.log(topics);
        var title = 'CREATE';
        //var description = "hello, node.js";
        //var list = template.list(topics);
        var list = "";
        var html = template.HTML(title,list,`

          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="적을 내용"></p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          ``);
          //`<a href="/create">create</a>`
        response.writeHead(200);
        response.end(html);
      });
}

exports.create_process = function(request,response) {
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        tempqu = `INSERT INTO ideanote (title, timestamp, creater_id) VALUES (?, NOW(),? );`,[post.title,1]
        console.log("삽입예정 쿼리문 :",tempqu);
        db.query(`INSERT INTO ideanote (title, timestamp, creater_id) VALUES (?, NOW(),? );`,[post.title,1],function(error,result){
          if(error) {
            throw error;
          }
          response.writeHead(302,{location:`/`});
          response.end();
        })
    });
}
exports.else = function(request,response,queryData) {
    db.query(`SELECT * FROM ideanote`,function(erorr,ideas){
        if(erorr) {
        }
        db.query(`SELECT * FROM ideanote WHERE id=${queryData.id};`,function(erorr2,idea) {
          if(erorr2) {
          }
          var title = idea[0].title;
          var description = idea[0].description;
          var list = template.list(ideas);
          var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>
          
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${queryData.id}">
            
          </form>`);
          response.writeHead(200);
          response.end(html);
        })
      }) 
}
exports.delete = function(request,response,queryData) {
     //ideanote.delete(request,response);
        
     var body = '';
     request.on('data',function(data){
       body = body + data;
     });
     request.on('end',function(){
       var post = qs.parse(body);
       db.query(`DELETE FROM ideanote WHERE id = ?`,[queryData.id],function(error, result) {
         if(error) {
           console.log("에러가 발생했습니다.")
           console.log(error)
           throw error;
         }
         response.writeHead(302,{location:`/`});
         response.end();
       });
   });
}

