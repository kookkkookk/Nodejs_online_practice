var express = require('express');
var router = express.Router();

//10-113 引入nodemailer
var nodemailer = require('nodemailer');

//10-115 引入CSRUF API
var csrf = require('csurf');
//使用CSRUF cookie功能 添加cookie確認User是使用瀏覽器進行操作
var csrProtection = csrf({ cookie: true});

//使用dotenv API 可以設定私密檔案連結 環境變數
require('dotenv').config();

//在首頁及接收post頁使用csrProtection阻擋CSRF攻擊
//errors 如果有收到post的errors 就顯示該傳遞過來的val至 index.ejs上
router.get('/', csrProtection, function(req, res) {
    res.render('contact', { 
        csrfToken: req.csrfToken(),
        errors: req.flash('errors')
    });
});

router.get('/review', function(req, res) {
    res.render('contactReview');
});

//在首頁及接收post頁使用csrProtection阻擋CSRF攻擊
router.post('/post', csrProtection, function(req, res) {
    //post如果接收到username為空 使用connect-flash 傳遞一個name:errors val:顯示在前端字串或html
    if(req.body.username === ''){
        req.flash('errors', '<span style="color:red;">姓名不可為空</span>');
        res.redirect('/contact');
    }

    //接收User post過來的表單資訊
    var data = req.body;
    console.log(data);

    //10-113
    //建立一個nodemailer 裡的 createTransport 功能。 mail初始化
    //service 指傳送郵件的服務 有可能是後端php asp等等的mail  這邊範例用gmail
    //auth user&pass 該服務器的帳號密碼

    //process 為nodejs 內建語法 .env為根目錄檔案
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.gmailUser,
            pass: process.env.gmailPass
        }
    });

    //建立send mail的資訊
    //from 寄件者
    //to 傳送給誰 兩位以上用,隔開
    //subject 標題
    //text 內容
    var mailOptions = {
        from: '"家豪公司"<fbbuy123@gmail.com>',
        to: 'fbbuy123@gmail.com',
        subject: req.body.username + '寄了一封信',
        text: req.body.description
    }

    //使用 nodemailer API裡createTransport的sendMail功能
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) return console.log(error);
        res.redirect('review');
    });

});
module.exports = router;
