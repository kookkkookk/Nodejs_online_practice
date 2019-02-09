var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

var engine = require('ejs-locals');

var bodyParser = require('body-parser');

//使用ejs引擎
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

//增加body資料解析
//可以解析json格式
app.use(bodyParser.json());
//解析表單內容的資料。 {extended: false} 可以讓表單抓到name資料
app.use(bodyParser.urlencoded({extended: false}))

app.get('/search', function(req, res){
    res.render('search');
});

//這邊使用 .post 指user傳送資料到後端時候，接收的地方
app.post('/searchList', function(req, res){

    //這邊就能使用bodyParser 解析 search.ejs傳送過來的資料，並解析成Obj. key name就等於<input type="text" name="searchText" value="">的name
    console.log("req.body: ",req.body);

    //或是直接取得那個key name 的 value
    console.log("req.body.searchText: ",req.body.searchText);

    //轉跳頁面
    res.redirect('search');

    //如果使用res.render('search') 會因為 action="/searchList" 而轉跳到searchList頁面
    //res.render('search');
})







//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000