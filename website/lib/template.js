module.exports = {
  HTML:function(href, title, list, body, control){
    console.log("href :",href)
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="${href}">HOME</a></h1>
      ${body}
      ${list}
      ${control}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<table>';
    var i = 0;
    if (filelist != undefined) {
      list = '<table border="1">';
      while(i < filelist.length){
        list = list + `<tr><td>${filelist[i].title}</td><td><form action="/ideanote/delete_process/${filelist[i].id}" method="post"><p><input type="submit" value="삭제"></p></form></td></tr>`;
        i = i + 1;
      }
    }
    list = list+'</table>';
    return list;
  }
}
