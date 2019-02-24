var express = require('express');
var router = express.Router();

//require FirebaseDB 資訊
var firebaseDb = require('../connections/firebase_admin_connect');

//接收 index.ejs post過來的 留言資訊
router.post('/', function (req, res) {

    //使用 express-validator API 的 checkBody (13-140)
    //notEmpty為checkBody裡的確認是否為空, 是的話就會把value 2 自訂義的錯誤訊息紀錄
    req.checkBody("content", "內容不得為空").notEmpty();
    //可以自訂義一個錯誤的var 使用validationErrors查看目前有什麼錯誤訊息
    var errors = req.validationErrors();
    console.log("errors: ", errors);
    //如果errors不為空值，代表有錯誤資訊
    if (errors) {
        //並且將錯誤資訊使用connect-flash傳回index.ejs顯示
        //使用errors[0].msg是因為 該API的validationErrors是屬於陣列, msg是指我剛剛req.checkBody value2自訂義的錯誤資訊
        req.flash('errors', errors[0].msg);
        res.redirect('/');
    } else {

        //抓取session 看是哪位user
        firebaseDb.ref('user/' + req.session.uid).once('value', function (snapshot) {

            //抓取該user資料
            var nickname = snapshot.val().nickname;

            //建立留言至firebase的path
            var ref = firebaseDb.ref('list').push();
            //留言資訊及該user資料
            var listContent = {
                uid: req.session.uid,
                nickname: nickname,
                content: req.body.content
            }
            //set至FirebaseDB 的path list
            ref.set(listContent)
                .then(function () {
                    res.redirect('/');
                })
        })
    }
})

module.exports = router;