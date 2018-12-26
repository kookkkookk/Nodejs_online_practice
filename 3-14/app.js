//因為是nodejs內建的，原理像module內部的資料，可以直接載入
var http = require('http');

//使用http裡面提共的 create server
//request post 使用者資料
//response server回傳
http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    //writeHead 回傳狀態 / 回傳內容類別

    response.write("Hello http createServer!!");
    //寫一個 "字串" 在頁面上

    response.end();
    //結束createServer
    
}).listen(8080);
//prot使用8080

// > http://127.0.0.1:8080/