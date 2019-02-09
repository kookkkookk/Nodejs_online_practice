var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

//該頁上一步沒有進行.use邏輯驗證, 可以直接進入
app.get('/', function(req, res){
    res.send(
        `<html>
            <head></head>
            <body>index</body>
        </html>`
    );
});

// use 就像是守門員, 進行route進行驗證, 成功才能next() 繼續進行往下的程式邏輯
app.use(function(req, res, next){
    console.log("有人進入USER頁");
    //進行驗證邏輯, 成功才允許下一步
    next();
});

//假如說上一步app.use 邏輯沒有通過沒有next() 該頁就無法進入
app.get('/user', function(req, res){
    res.send(
        `<html>
            <head></head>
            <body>user</body>
        </html>`
    );
});













//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000