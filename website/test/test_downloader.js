/*

오류문을 포함한 로그는 아래와 같다.

사용자에게 파일을 제공해도 괜찮습니다.
filecontrol downloadprocess DownloadTargetType : png
filecontrol downloadprocess DownloadTargetName : filetarget1864577.png
filecontrol downloadprocess DownloadFileFullPath : files/filetarget1864577.png
C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Parser.js:437
      throw err; // Rethrow non-MySQL errors
      ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:558:11)
    at Query.<anonymous> (C:\workspace\nodejs\website\lib\filecontrol.js:257:22)
    at Query.<anonymous> (C:\workspace\nodejs\website\node_modules\mysql\lib\Connection.js:526:10)
    at Query._callback (C:\workspace\nodejs\website\node_modules\mysql\lib\Connection.js:488:16)
    at Query.Sequence.end (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\sequences\Sequence.js:83:24)
    at Query._handleFinalResultPacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\sequences\Query.js:149:8)
    at Query.EofPacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\sequences\Query.js:133:8)
    at Protocol._parsePacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Protocol.js:291:23)
    at Parser._parsePacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Parser.js:433:10)
    at Parser.write (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Parser.js:43:10) {
  code: 'ERR_HTTP_HEADERS_SENT'
}

위의 로그 중 '사용자에게 파일을 제공해도 괜찮습니다.'이라는 문장이 사실 2개가 들어가있었는데, (lib/filecontrol.js)
이 문장을
사용자에게 파일을 제공해도 괜찮습니다. 1
와
사용자에게 파일을 제공해도 괜찮습니다. 2 
로 구분하여 출력하자,

result[0]['file_public_able'] 1: yes
사용자에게 파일을 제공해도 괜찮습니다. 1
filecontrol downloadprocess DownloadTargetType : png
filecontrol downloadprocess DownloadTargetName : filetarget1578061.png
filecontrol downloadprocess DownloadFileFullPath : files/filetarget1578061.png
C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Parser.js:437
      throw err; // Rethrow non-MySQL errors
      ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:558:11)
    at Query.<anonymous> (C:\workspace\nodejs\website\lib\filecontrol.js:257:22)
    at Query.<anonymous> (C:\workspace\nodejs\website\node_modules\mysql\lib\Connection.js:526:10)
    at Query._callback (C:\workspace\nodejs\website\node_modules\mysql\lib\Connection.js:488:16)
    at Query.Sequence.end (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\sequences\Sequence.js:83:24)
    at Query._handleFinalResultPacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\sequences\Query.js:149:8)
    at Query.EofPacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\sequences\Query.js:133:8)
    at Protocol._parsePacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Protocol.js:291:23)
    at Parser._parsePacket (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Parser.js:433:10)
    at Parser.write (C:\workspace\nodejs\website\node_modules\mysql\lib\protocol\Parser.js:43:10) {
  code: 'ERR_HTTP_HEADERS_SENT'
}

C:\workspace\nodejs\website>
라고 출력됐다.
*/

// https://avengersrhydon1121.tistory.com/150
//ID 중복조회
const selectQuery = connection.query('select user_id from users',(err,rows)=>{
    if(err){ throw err; }
    else{ 
      //결과값을 배열로 가져오기때문에 체크해줘야함 
      for(let i=0; i<rows.length;i++){
       if(user_id === rows[i].user_id){
         res.json({message : '400 Bad Request'}) 
       } 
     } 
   } 
 }); 
 //회원가입 
 const query = connection.query('insert into users set ?',sql,(err,rows)=>{ 
   if(err){ throw err; }
   else{ 
     res.json({message : '200 OK'}) //프론트로 뿌려줌. 
   } 
 });
 
//위에 코드는 안되는거고 아래 코드는 되는거


const selectQuery = connection.query('select user_id from users where user_id=?',[user_id],(err,rows)=>{ 
    if(rows.length == 0){ 
        const query = connection.query('insert into users set ?',sql,(err,rows)=>{ 
            if(err){ throw err; }
            else{ 
                res.json({message : '200 OK'}) //프론트로 뿌려줌. 
            } 
        }); 
    }else{ 
        res.json({message : '400 Bad Request'}); 
    } 
});
