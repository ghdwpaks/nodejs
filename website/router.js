const express = require('express');
const router = express.Router();
var db = require('./db.js');

exports.serve_login_session_data = function(request,response) {
    console.log("이 출력문은 세션값 반환 요청을 받았음을 증명합니다.");
    
}
