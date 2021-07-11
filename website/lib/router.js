const express = require('express');
const router = express.Router();
var db = require('./db.js');
var session = require('express-session')

exports.serve_login_session_data = function(request,response,user_number,user_name) {
    console.log("이 출력문은 세션값 반환 요청을 받았음을 증명합니다.");
    console.log("serve_login_session_data request.body[id] :",request.body["id"]);
    request.session.user_id = request.body["id"];
    request.session.user_number = user_number;
    request.session.user_name = user_name;
    console.log("serve_login_session_data request.session.id :",request.session.user_id);
    console.log("serve_login_session_data user_number :",user_number);
    console.log("serve_login_session_data request.session.user_number :",request.session.user_number);
    request.session.save(function(){});
    //console.log("request.session.id === request.body['id'] :",request.session.id === request.body["id"])
    //response.render('/', {"user_id" : request.session.id});
}

