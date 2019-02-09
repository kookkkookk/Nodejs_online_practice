var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

var login = function(req, res, next){
    var _url = req.url;
    console.log("_url: ",_url);
    if(_url === "/"){
        console.log("準備進入首頁，進行驗證");
        next();
    }else if(_url === "/user"){
        console.log("準備進入User頁，進行驗證");
        next();
    }
}

//方式1 使用app.use()呼叫該use驗證
//app.use(login);

//方法2 get完後呼叫該use驗證
app.get('/',login ,function(req, res){
    console.log("進入首頁");
    res.send(
        `<html>
            <head></head>
            <body>index</body>
        </html>`
    );
});

app.get('/user',login ,function(req, res){
    console.log("進入user頁");
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