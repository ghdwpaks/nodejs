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
      ${control}
      ${list}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<table border="0">';
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
  },filelist:function(filelist){
    console.log("template filelist function filelist :",filelist)
    var list = '<table border="0">';
    var i = 0;
    if (filelist != undefined) {
      list = '<table border="1">';
      list = list + "<tr><td>제목</td><td>내용</td>"
      while(i < filelist.length){
        var filecon = ""
        var filetitle = ""
        if (String(filelist[i].file_content).length > 20) {
          filecon = String(filelist[i].file_content).slice(20)+"...";
        } else {  filecon = String(filelist[i].file_content);}
        
        var filetitle = ""
        if (String(filelist[i].file_title).length > 20) {
          filetitle = String(filelist[i].file_title).slice(20)+"...";
        } else {filetitle = String(filelist[i].file_title);}
        list = list + `<tr><td><a href="/filepage/ShowDetail/${filelist[i].file_number}">${filetitle}</a></td><td>${filecon}</td></tr>`;
        i = i + 1;
      }
    }
    list = list+'</table>';
    return list;
  }
}
