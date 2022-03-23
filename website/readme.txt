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
파일 다운로드 가능 여부에 대해서, 사용자에게 미리 공지하는 부분의 제작 및 개선











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