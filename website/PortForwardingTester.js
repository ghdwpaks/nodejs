const http = require('http');
const hostname = '[내부 conoha ip주소]';
const port = 80;


http.createServer((req,res)=>{
res.write('<h1>Hello Node!</h1>');
res.end('<p>Hello Server!</p>');
}).listen(port,hostname,()=>{
console.log(`Server running at http://${hostname}:${port}`);
})