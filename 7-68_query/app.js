var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

app.get('/user/:name/', function(req, res){
    //使用 ":key", 可以用request功能裡的params取得該user輸入參數
    var getParams = req.params;
    //console.log("getParams: ",getParams);
    var getName = getParams.name;

    //query 可以抓取網址?後帶的key與val
    var getQuery = req.query;
    console.log("getQuery: ",getQuery);

    //limit這個宣告名較常被用來使用所要顯示的筆數
    var limit = getQuery.limit;
    var search = getQuery.search;
    console.log("limit: ",limit);
    console.log("search: ",search);
    
    res.send(
        `<html>
            <head></head>
            <body>
                <h1>
                    ${ getName }
                    搜尋 ${ search } 關鍵字，
                    顯示筆數為 ${ limit } .
                </h1>
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