var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');

var express = require('express');
var app = express();

//var bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}));



exports.home = function(request,response) {
    console.log("ideanote home request.session :",request.session)
    console.log("ideanote home request.session.user_number :",request.session.user_number)
    console.log("ideanote home 삽입 예정 쿼리문 :",`SELECT * FROM ideanote WHERE creater_id = ${request.session.user_number};`)
    db.query(`SELECT * FROM ideanote WHERE creater_id = ${request.session.user_number};`,function(error,ideas){

        var title = 'title';
        var description = "description";
        var list = template.list(ideas);
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
exports.create = function(request,response) {
    console.log("ideanote create request.session.user_id :",request.session.user_id)
    console.log("ideanote create request.session.user_number :",request.session.user_number)
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
  
    console.log("ideanote create_process request.session.user_id :",request.session.user_id)
    console.log("ideanote create_process request.session.user_number :",request.session.user_number)
    var post = request.body;
    db.query(`INSERT INTO ideanote (title, timestamp, creater_id) VALUES (?, NOW(),? );`,[post.title,request.session.user_number],function(error,result){
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

