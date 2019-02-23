var express = require('express');
var router = express.Router();

//require FirebaseDB 資訊 (12-129)
var firebaseDb = require('../connections/firebase_admin_connect');
//require Firebase 註冊登入資訊 (12-130)
var firebase = require('../connections/firebase_connect');

router.get('/', function (req, res, next) {
    //(12-130)
    console.log(firebase.auth());
    
    //(12-129)
    firebaseDb.ref().once('value', (snapshot)=>{
        //console.log(snapshot.val());
    });

    //如果登入成功，以下要開始登入成功後的事件 (12-135)
    //接收登入成功的uid
    var auth = req.session.uid;
    res.render('index', {
        title: '六角學院留言板',
        auth: auth
    });
});
/* GET home page. */
module.exports = router;