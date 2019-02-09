var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

//如果網址停在http://127.0.0.1:3000/ (首頁) 後面就不會執行
app.get('/', function(req, res){
    res.send(
        `<html>
            <head></head>
            <body>index</body>
        </html>`
    );
});
/*
app.use(function(req, res, next){
    console.log("舉例use執行了一個錯誤的Fn。 進入 status(500) 頁面")
    errFn();
    next();
});
*/

//通常都要再最後加404頁面，如果.get router不到任何User輸入網址就會進入該404
app.use(function(req, res, next){
    res.status(404).send(
        `<html>
            <head></head>
            <body>抱歉, 沒有這個頁面。</body>
        </html>`
    );
});

//這個也是通常要在最後加入的，避免ㄧ些錯誤中斷了node的執行導致其他頁都壞了，也避免讓user看見程式錯誤的畫面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send(
        `<html>
            <head></head>
            <body>抱歉, 程式有些問題請稍後再嘗試。</body>
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