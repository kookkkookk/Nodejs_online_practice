var express = require('express');
var router = express.Router();

//require Firebase 註冊登入資訊
var firebase = require('../connections/firebase_connect');
//require FirebaseDB 資訊
var firebaseDb = require('../connections/firebase_admin_connect');
//使用firebase auth 註冊功能
var fireAuth = firebase.auth();

router.get('/', function (req, res) {
    res.render('login', { title: '登入' });
})

router.post('/', function (req, res) {
    //從login.ejs post過的資訊
    var email = req.body.email;
    var password = req.body.password;

    //使用firebase auth 的 email & password登入功能 (12-134)
    fireAuth.signInWithEmailAndPassword(email, password)
    .then(function(user){
        console.log("登入成功");
        //console.log(user);

        //當登入成功，要讓瀏覽器知道目前狀態是屬於已登入，所以要用Session紀錄一些私密資訊 (12-135)
        req.session.uid = user.uid;
        res.redirect('/');
    })
    .catch(function(error){
        console.log("登入失敗");
        console.log(error);
        res.redirect('/');
    })
})
module.exports = router;