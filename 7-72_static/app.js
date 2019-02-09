var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

//設定img css json 等等靜態資料的根目錄
//使用 express 裡的 static 方法
app.use(express.static('public'));

//img src就能抓到public裡的路徑
app.get('/', function(req, res){
    res.send(
        `<html>
            <head></head>
            <body>
                <img src="/images/logo.jpg">
            </body>
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