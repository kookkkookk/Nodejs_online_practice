var express = require('express');
var router = express.Router();

//require Firebase 註冊登入資訊 (12-131)
var firebase = require('../connections/firebase_connect');
//require FirebaseDB 資訊 (12-132)
var firebaseDb = require('../connections/firebase_admin_connect');

//使用firebase auth 註冊功能
var fireAuth = firebase.auth();

router.get('/', function (req, res) {
    res.render('signup', { title: '註冊', error: req.flash('error') });
})

router.post('/', function (req, res) {
    //從signup.ejs post過的資訊 (12-131)
    var email = req.body.email;
    var password = req.body.password;

    //由於有可能 Auth 回傳user的資訊是不足的，有可能我自需要是否結婚資訊， 暱稱是什麼資訊 (12-132)
    //所以可以結合firebaseDb 及Auth 每一個Uesr的UID 存放更多額外資訊串聯在firebaseDb
    var nickname = req.body.nickname;
    var age = req.body.age;

    fireAuth.createUserWithEmailAndPassword(email, password)
    .then(function(user){
        //傳送成功

        //成功後會收到Auth回傳的user 的資料 (12-132)
        //裡面會有非常多資訊 ex UID:這個User專有的id, email, password, 是否已認證 等等
        console.log(user);

        //存放更多該User的額外資訊至firebaseDb (12-132)
        var saveUser = {
            'email': email,
            'nickname': nickname,
            'age': age,
            'uid': user.uid
        }
        //存放路徑為user/該user的uid/資料
        firebaseDb.ref('/user/'+user.uid).set(saveUser);

        //成功後轉跳success 頁面 (12-131)
        res.redirect('/signup/success')
    })
    .catch(function(error) {
        //傳送失敗

        //如果再註冊失敗則會跳到catch(), 並回傳error 帶錯誤資訊 (12-133)
        //Auth註冊失敗 規則有很多種，例如 密碼少於6個字或email格式錯誤等等
        var errorMessage = error.message;
        //並且用connect-flash回傳errorMsg至signup.ejs頁面
        req.flash('error', errorMessage);
        res.redirect('/signup');

    })
})
router.get('/success',function(req,res){
    res.render('success',{
        title:'註冊成功'
    });
})
module.exports = router;