var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'nodejs',
  password:'111111',
  database:'opentutorials'
});


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        /*
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
        */
        db.query(`SELECT * FROM topic`,function(error,topics){
          //console.log(topics);
          var title = 'welcome';
          var description = "hello, node.js";
          var list = template.list(topics);


          /*
          var topic_names = new Array();
          topic_names_i = 0
          while (true) {
            try {
              topic_names[topic_names_i] = topics[topic_names_i].title;
            } catch {
              break;
            }
            topic_names_i++;
          }
          console.log(topic_names)
          var list = template.list(topic_names);
          */
          //console.log(topics)
          //console.log(list)
          var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);

        });
      } else {
        /*
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']
            });
            var list = template.list(filelist);
            var html = template.HTML(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              ` <a href="/create">create</a>
                <a href="/update?id=${sanitizedTitle}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
        */
       db.query(`SELECT * FROM topic`,function(erorr,topics){
         if(erorr) {
           console.log(erorr)
         }
         console.log(queryData.id)
         tempmessage1 = `SELECT * FROM topic WHERE id=${queryData.id};`
         console.log(tempmessage1)
         db.query(`SELECT * FROM topic WHERE id=${queryData.id};`,function(erorr2,topic) {
           if(erorr2) {
            console.log(erorr2)
           }
           console.log(topic[0].title);
           var title = topic[0].title;
           var description = topic[0].description;
           var list = template.list(topics);
           var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>
           <a href="/update?id=${queryData.id}">update</a>
           <form action="delete_process" method="post">
             <input type="hidden" name="id" value="${queryData.id}">
             <input type="submit" value="delete">
           </form>`);
           response.writeHead(200);
           response.end(html);
         })
       }) 
      }
    } else if(pathname === '/create'){

      db.query(`SELECT * FROM topic`,function(error,topics){
        //console.log(topics);
        var title = 'CREATE';
        //var description = "hello, node.js";
        var list = template.list(topics);
        var html = template.HTML(title,list,`

          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          tempqu = `INSERT INTO topic (title, description, created, author_id) VALUES (?,?, NOW(),? );`,[post.title,post.description,1]
          console.log("삽입예정 쿼리문 :",tempqu);
          db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?,?, NOW(),? );`,[post.title,post.description,1],function(error,result){
            if(error) {
              throw error;
            }
            response.writeHead(302,{location:`/?id=${result.insertId}`});
            response.end();
          })
      });
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            })
          });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
