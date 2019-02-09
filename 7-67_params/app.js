var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

app.get('/user/:name/:date', function(req, res){
    //使用 ":key", 可以用request功能裡的params取得該user輸入參數
    var getParams = req.params;
    console.log("getParams: ",getParams);

    var getName = getParams.name;
    var getHappenDate = getParams.date;
    console.log("getName: ",getName);
    console.log("getHappenDate: ",getHappenDate);
    

    res.send(`<html><head></head><body><h1>${ getName + " " + getHappenDate }</h1></body></html>`);
});














//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000