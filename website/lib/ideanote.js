var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');

var express = require('express');
var app = express();

//var bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}));



exports.home = function(request,response) {
    db.query(`SELECT * FROM ideanote`,function(error,ideas){
        var title = 'title';
        var description = "description";
        var list = template.list(ideas);
        var html = template.HTML('/',title,list,'',`<a href="/ideanote/create">create</a>`);
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
        var html = template.HTML('/',title,list,`

          <form action="/ideanote/create_process" method="post">
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
    var post = request.body;
    db.query(`INSERT INTO ideanote (title, timestamp, creater_id) VALUES (?, NOW(),? );`,[post.title,1],function(error,result){
      if(error) {
        throw error;
      }
      response.writeHead(302,{location:`/ideanote`});
      response.end();
    })
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
          var html = template.HTML('/',title,list,`<h2>${title}</h2>${description}`,`<a href="/ideanote/create">create</a>
          
          <form action="/ideanote/delete_process" method="post">
            <input type="hidden" name="id" value="${queryData.id}">
            
          </form>`);
          response.writeHead(200);
          response.end(html);
        })
    }) 
}
exports.delete = function(request,response,delete_target_id) {
    

    db.query(`DELETE FROM ideanote WHERE id = ?`,[delete_target_id],function(error, result) {
      if(error) {
        console.log("에러가 발생했습니다.")
        console.log(error)
        throw error;
      }
      response.writeHead(302,{location:`/ideanote`});
      response.end();
    });
}

