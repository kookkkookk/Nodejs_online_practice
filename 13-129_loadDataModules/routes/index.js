var express = require('express');
var router = express.Router();

//require FirebaseDB 資訊 (13-129)
var firebaseDb = require('../connections/firebase_admin_connect');
//require Firebase 註冊登入資訊 (13-130)
var firebase = require('../connections/firebase_connect');

router.get('/', function (req, res, next) {
    //(13-130)
    //console.log(firebase.auth());
    
    //(13-129)
    firebaseDb.ref().once('value', (snapshot)=>{
        //console.log(snapshot.val());
    });

    //顯示firebaseDb裡的留言資訊 (13-141)
    firebaseDb.ref('list').once('value', (snapshot) => {

        //如果登入成功，以下要開始登入成功後的事件 (13-135)
        //接收登入成功的uid
        var auth = req.session.uid;
        res.render('index', {
            title: '六角學院留言板',
            auth: auth,
            //如果User留言的資訊有錯誤，接收 messageBoard 過來的connect-flash過來的資訊 (13-140)
            errors: req.flash('errors'),

            //12-141
            list: snapshot.val()
        });
    })

});
/* GET home page. */
module.exports = router;