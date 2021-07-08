module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>

      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<table border="1">';
    var i = 0;
    while(i < filelist.length){
      list = list + `<tr><td>${filelist[i].title}</td><td><form action="/delete?id=${filelist[i].id}" method="post"><p><input type="submit" value="삭제"></p></form></td></tr>`;
      i = i + 1;
    }
    list = list+'</table>';
    return list;
  }
}
