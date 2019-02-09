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
var fireData = admin.database();
//console.log("fireData: ",fireData);

//假如資料庫內已經有此資料 (寫入 {todos:{'key':'val'}} )
//fireData.ref("todos").set({"title": "title8-94"});

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
   fireData.ref("todos").once('value', (snapshot)=>{
      var data = snapshot.val();
      var title = data.title;
      //將成功get /todos > title val 傳入 index.ejs
      res.render('index', {"title": title});
   });
});

//RESTful 新增firebase資料邏輯
app.post('/addTodo', (req, res)=>{
   //取得post傳入的資料
   var content = req.body.content;
   //綁定firebase 'todos' push狀態
   var contentRefPush = fireData.ref('todos').push();
   //set進新一筆post傳入的資料
   contentRefPush.set({"content": content})
   .then(()=>{
      fireData.ref('todos').once('value', (snapshot)=>{

         //res.send(snapshot.val());
         //也可以回傳傳入較詳細的資訊
         res.send(
            {
               "success":true,
               "result":snapshot.val(),
               "msg":"資料讀取成功"
            }
         )
      })
   })
});

//RESTful 刪除firebase資料邏輯
app.post('/removeTodo', (req, res)=>{
   var _id = req.body.id;
   fireData.ref('todos').child(_id).remove()
   .then(()=>{
      fireData.ref('todos').once('value',(snapshot)=>{
         res.send(
            {
               "success":true,
               "result":snapshot.val(),
               "msg":"資料刪除成功"
            }
         )
      })
   })
});

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);