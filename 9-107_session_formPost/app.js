var express = require('express');
//載入express-session工具
var session = require('express-session');
var bodyParser = require('body-parser');
//載入cookie工具
var cookieParser = require('cookie-parser');
var app = express();

var engine = require('ejs-locals');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

//解析cookie
app.use(cookieParser());

//init session
//secret 為解析cookie val亂數的鑰匙 可以自己寫一段數字，只有這段"鑰匙"可以解析cookie val亂數 (也能預設keyboard cat)
//resave 為重新造訪該頁面時，session是否會生效，是否會寫入nodejs (這邊建議true 不管怎樣都寫入到nodejs)
//cookie: {maxAge: 10*1000} 設計該session十秒後過期
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 10*1000}
}));

app.get('/', function(req, res){
    //示範接收session資料用,將收到資料回傳給.ejs
    res.render('index',{
        'userName': req.session.username,
        'eMail': req.session.email
    });
});

//建立一個首頁的post接收器
app.post('/', (req, res)=>{
    //將前端頁面post過來資料包裝成session
    req.session.username = req.body.username;
    req.session.email = req.body.email;
    res.redirect('/');
});







//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000