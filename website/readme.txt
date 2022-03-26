hello world!



이 이 파일은 node.js 와 mysql 을 이용한 웹사이트 제작에 관한 문서입니다.
기본적으로는 사용설명에 대한 내용을 주로 담고 있으며
제작 과정 및 역사에 대해서는 이 문서에서 서술하지 않고 git 의 기록으로 남깁니다.

main.js 는 기본적인 hub 를 담당합니다.
node main.js 를 이용해 로컬호스트로 호스팅을 할 수 있습니다.


var ideanote = require("./lib/ideanote.js");
var mainpage = require("./lib/mainpage.js");
var user = require("./lib/user.js");
var login = require("./lib/login.js");
var logout = require("./lib/logout.js");
var filecontrol = require("./lib/filecontrol.js");
(*main.js 의 초반 문단으로부터...)

Ideanote    : 간단한 생각들을 적는 로직입니다. 서버로 데이터가 올라가서 DB 를 조회하는 과정을 포함하고있습니다.
mainpage    : 코더의 허브가 main.js 라면 클라이언트(이용자)의 중앙 허브는 mainpage에서 제공합니다.
user        : 유저의 로그인, 로그아웃 , 회원가입 기능의 코드(HTML) 포함됨
login : 유저의 로그인 과정에 들어가는 코드와 쿼리문 등등의 세부적인 내용이 포함됨
logout : 사용자의 세션값을 지워주는 코드 포함됨
filecontrol : mainpage 와의 연결, 파일 업로드와 다운로드 등등의 코드가 포함됨


오류보고 : 

01해결됨
기능검증용 테스트 도중 파일 업로드 할때, 파일 이름이 너무 길면 mysql 차원에서 입력이 안되는 오류가 발생함.
마지막으로 파일 이름 길이 검수 과정을 추가하여 30자 이상 넘어가면 잘라내는 형식으로 mysql 쿼리문에 들어가도록 설정함으로써 문제를 해결함.

02미해결
파일의 이름이 30자 이상 넘어갈 경우 실제 저장된 파일 이름과 실질적으로 msyql DB 에 저장되는 파일의 이름이 일치하지 않는것을 확인함.
임시조치로 파일 업로드 하는 곳에 긴 이름을 쓰지 말라는 경고문을 작성함.

03해결됨
MySQL workbench에서의 작업환경 재구축에 성공함. 사용된 명령어들은 'WhatIUsedOnMysql.txt' 파일에 기술됨.


작업목표
01오류처럼 편의성 부분 개선
로컬 저장소에 저장돼있는 파일들중에 쓸모없는게 뭐가 있는지 검사하고 식별하는 개발자용 기능 제작하기

파일 다운로드 가능하게 해놓기. 지금 보면 filecontrol.js 파일에 downloadprocess 문단을 보면 다운로드 직전까지 모든 자격증명을 위한 절차를 진행하고서 실질적인 다운로드를 진행하는곳을 안만들어놨다.
참고자료
https://avengersrhydon1121.tistory.com/150
https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hyoun1202&logNo=220675944242
https://whichmean.tistory.com/6
https://www.zerocho.com/category/NodeJS/post/60778f07cf47fe0004727b12
http://daplus.net/javascript-node-js%EB%A1%9C-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-%ED%83%80%EC%82%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/
https://fierycoding.tistory.com/85?category=928039


(완성)다운로드 불가능 파일에 대해서 실수로 눌렀을때 서버가 다운되는것을 방지하기 위해 (*try catch 단을 새로 만들어주기 - 변경) 다운로드 하지 못하게 다운로드 되는 <a>태그 링크를 일반 평문으로 바꾸기
(완성)파일 다운로드 가능 여부에 대해서, 사용자에게 미리 공지하는 부분의 제작 및 개선


hello world!



This file is about creating a website using node.js and mysql.
Basically, it mainly contains the instructions for use.
The production process and history will not be described in this paper, but will be recorded in git.

The main.js is responsible for the basic hub.
You can host as a local host using node main.js.


var ideanote = require("./lib/ideanote.js");
var mainpage = require("./lib/mainpage.js");
var user = require("./lib/user.js");
var login = require("./lib/login.js");
var logout = require("./lib/logout.js");
var filecontrol = require("./lib/filecontrol.js");
(*From the beginning paragraph of main.js...)

Ideanote: Logic for writing simple thoughts. It includes the process of data going up to the server and inquiring the DB.
mainpage: If the coder hub is main.js, the client (user) central hub is provided by mainpage.
user: Includes the HTML code for the user's login, logout, and membership functions.
login: Includes details such as code and query statements that enter the user's login process.
logout: Contains code that clears the user's session value.
Filecontrol: Includes code such as connecting to the main page, uploading and downloading files, etc.


Error Report: 

resolution
When uploading a file during a function verification test, if the file name is too long, an error occurs that cannot be entered at the mysql level.
Finally, the problem is solved by adding a file name length check process and setting it to enter mysql query statements in the form of truncation after more than 30 characters.

unresolved
If the file name is longer than 30 characters, verify that the file name actually does not match the file name stored in the msyql DB.
As a temporary measure, write a warning not to write a long name where you upload the file.