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
    //console.log("req.body: ",req.body);
    //console.log("req.body.searchText: ",req.body.searchText);
    res.redirect('search');
});

//searchAJAX 這頁拿來測試AJAX 傳進資料後回傳hello
app.post('/searchAJAX', function(req, res){
    res.send('hello AJAX');
    console.log("req.body: ",req.body);
});







//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000