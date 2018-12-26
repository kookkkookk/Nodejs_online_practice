//因為是nodejs內建的，原理像module內部的資料，可以直接載入
var http = require('http');

//使用http裡面提共的 create server
//request post 使用者資料
//response server回傳
http.createServer(function (request, response) {

    //使用者的各項資料，使用的瀏覽器、日期時間、導向的頁面等等
    //console.log(request);
    //使用者要進入的頁面 (如果在網址後輸入/hello 就會得到/home, 代表使用者目前網址是/home)
    console.log(request.url);

    /*
    //writeHead 回傳狀態 / 回傳內容類別。 text/plain這邊是指純文字格式
    response.writeHead(200, { "Content-Type": "text/plain" });
    //寫一個 "字串" 在頁面上
    response.write("Hello http createServer!!");
    */

    
    //text/html 格式
    response.writeHead(200, { "Content-Type": "text/html" });
    //寫一個<h1>text</h1> 到 html格式上
    response.write("<h1>Hello http createServer!!</h1>");
    

    //結束createServer
    response.end();

}).listen(8080);
//prot使用8080

// > http://127.0.0.1:8080/