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

/*//8-92
//假如資料庫內已經有此資料 (寫入 {todos:{'content':'8-92'}} )
fireDate.ref("todos").set({"content": "hello"});
//讀取todos val
fireDate.ref("todos").once('value', (snapshop)=>{
   console.log("snapshop.val(): ",snapshop.val());
});*/

//8-93 //繼續接著 .then() 完成回傳後繼續下一步fn
fireDate.ref("todos").set({"content": "8-93"})
.then(()=>{
   fireDate.ref("todos").once('value', (snapshop)=>{
      console.log("snapshop.val(): ",snapshop.val());
   });
});

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
   res.render('index');
    
})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);