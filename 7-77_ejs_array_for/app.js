var express = require('express');
var app = express(); //express 的各種方法
//console.log(app);

//使用 npm 安裝的ejs-locals
var engine = require('ejs-locals');

//express 要使用什麼類型的模板，因為較常見nodejs模板有 ejs、pug
//所以這邊引擎要先指定使用哪一個模板套件
app.engine('ejs', engine);

//express.set是設定 express內的一些功能
//.set('views', './views') 指將Template模板設定在什麼路徑下
app.set('views', './views');

//express確認要用哪一個引擎去驅動Template
app.set('view engine', 'ejs');

app.get('/', function(req, res){

    // .render會去讀取上面設定views的路徑 去讀Tempalte檔案 (不用帶副檔名, 因為已經有指定是使用ejs了)
    //帶參數至ejs 直接在後面多一個參數傳遞(obj)
    //輸入各種格式至.ejs
    res.render('index',{
        'title': '<h2 class="outputInEjs">家豪公司</h2>',
        'boss': 'Ben',
        'courses': ['html','css','js','php','nodejs','vuejs','react']
    });
});









//監聽port
//process.env.PORT 為該node上傳server 會使用該server的port 在本地端沒有該項目則就false 使用後者。
var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);

//執行cmd
//node app.js
//網址: 127.0.0.1:3000 or localhost:3000