var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

app.get('/', function(req, res){
    //request 一般都會使用縮寫 req
    //response > res

    //get('/',) 第一個參數為網址, '/' 為首頁

    //res 回傳以下send內容
    res.send('<html><head></head><body><h1>Hello node express!</h1></body></html>');
});

//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000