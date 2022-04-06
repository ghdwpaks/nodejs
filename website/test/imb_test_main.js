var express = require('express');
var app = express();
app.get('/download', function(req, res){
  const file = `./pic1.png`;
  res.download(file); 
});
app.listen(3000, function() {})