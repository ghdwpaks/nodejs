const http = require('http');

var express = require('express');
const hostname = '127.0.0.1';
const port = 3000;

var app = express()
app.use(express.urlencoded({extended:true}));

app.get('/home',function(request,response) {
    console.log("mainpage home 진입함")
    var title = 'HOMEPAGE';
    var html = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="">HOME</a></h1>
    </body>
    </html>
    `
    response.writeHead(200);
    response.end(html);
});

app.listen(3000, function() {
    console.log("진입에 성공했습니다.")
})