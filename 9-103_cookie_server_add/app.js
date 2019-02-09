var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

var engine = require('ejs-locals');

//載入cookie工具
var cookieParser = require('cookie-parser');//載入cookie 解析
//解析cookie
app.use(cookieParser());

app.engine('ejs', engine);

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    console.log(req.cookies);
    //Server端 (app.js) set一個cookie至前端
    //maxAge 失效時間 (毫秒 1000=1秒)
    //httpOnly 不能被js讀取使用
    res.cookie('myName', 'Many', {
        maxAge: 10000,
        httpOnly: true
    })
    res.render('index',{
        'title': '家豪公司',
        'boss': 'Ben'
    });
});









//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000