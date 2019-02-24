var express = require('express');
var router = express.Router();
//require FirebaseDB 資訊 (13-129)
var firebaseDb = require('../connections/firebase_admin_connect');

router.get('/', function (req, res) {

    //如果登入成功就會取道session帳號Uid資料 (13-137)
    //藉此uid也能進到FirebaseDb正確Uid路徑，抓到該用戶資訊
    firebaseDb.ref('user/'+req.session.uid).once('value',function(snapshot){

        //將用戶資訊貼至個人頁面
        res.render('user', { title: '會員專區',
                             nickname: snapshot.val().nickname,
                             age: snapshot.val().age
                           });
    })
    
})
module.exports = router; 