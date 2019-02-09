var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');

// require npm firebase-admin
var admin = require("firebase-admin");
var serviceAccount = require("./expressfirebasetest-a1e8b-firebase-adminsdk-57ize-10b886e49b.json");
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://expressfirebasetest-a1e8b.firebaseio.com"
});

//使用admin.database服務
var fireDate = admin.database();
//console.log("fireDate: ",fireDate);

//假如資料庫內已經有此資料 (寫入 {todos:{'key':'val'}} )
fireDate.ref("todos").set({"title": "title8-94"});

app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static('public'))

// 增加 body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//路由
app.get('/',function(req,res){
   //讀取firebase資料 /todos
   fireDate.ref("todos").once('value', (snapshop)=>{
      var data = snapshop.val();
      var title = data.title;
      //將成功get /todos > title val 傳入 index.ejs
      res.render('index', {"title": title});
   });
})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);