var express = require('express');
var router = express.Router();
//moment 可以將時間做格式切換
const moment = require('moment');
var firebaseAdminDb = require('../connections/firebase_admin');
//stringtags 為可以將Htmp String化
const stringtags = require('striptags');

const convertPagination = require('../modules/convertPagination');

//指定一個Firebase路徑 (categories 文章分類)
const categoriesRef = firebaseAdminDb.ref('/categories/');
//指定一個Firebase路徑 (articles) 建立文章)
const articlesRef = firebaseAdminDb.ref('/articles/');

var firebaseAdminDb = require('../connections/firebase_admin');



/* GET home page. */
router.get('/', function (req, res, next) {

  //取得前端?page=x 當前頁 (注意 由於前端點prev&next 上下頁是使用+1-1 後端傳過去的page.current為字串，所以這邊Get 轉Number)
  let currentPage = Number.parseInt(req.query.page) || 1;

  //取得Firebase categories
  let categories = {};
  categoriesRef.once('value').then(function(snapshot){
    categories = snapshot.val();
    //orderByChild 排序(詳細可以查看6-51)
    return articlesRef.orderByChild('update_time').once('value');

    //ES6 promise 取得完categories後 .then() 要取得articles
  }).then(function(snapshot){
    //這邊因為要將每一個文章做pages list 所以要將article 塞入articles[]
    const articles = [];
    //使用Firebase forEach方法
    snapshot.forEach(function(snapshotChild){
        //特別注意，因為是顯示在前端，只能將公開的傳入ejs
        if ('public' === snapshotChild.val().status){
            //將每一筆article data 塞入ary
            articles.push(snapshotChild.val());
        }
    });
    //做反轉排序，因為Firebase是將新資料往下塞，但顯示上要將新的呈現在上
    articles.reverse();

    const data = convertPagination(articles, currentPage);
    console.log('convert pagination js: ', data);
    
    //console.log(categories, articles);
    res.render('index', {
        articles: data.data,//這個就不能傳入article了 要改成設定好要顯示的data
        categories,
        page: data.page,
        stringtags,
        moment
    });
  })
});

router.get('/post/:id', function (req, res, next) {
  const id = req.param('id');
  //console.log("id: ",id);
  let categories = {};

  //這邊要使用ES6 Promise 第一次once取 categories
  //完成後.then() 再利用id取得 articlesRef 裡的 article
  categoriesRef.once('value').then(function (snapshot) {
      categories = snapshot.val();
      return articlesRef.child(id).once('value');
  }).then(function(snapshot){
      const article = snapshot.val();
      //console.log("article: ",article);

      //例外判斷要是沒有該article id 或User亂修改URL articel id 導向error頁面
      if (!article){
        return res.render('error', {
          title: '找不到該文章'
        })
      }

      res.render('post', {
          categories,
          article,
          moment
      });
    })
});

router.get('/dashboard/signup', function (req, res, next) {
  res.render('dashboard/signup', { title: 'Express' });
});

router.get('error', function (req, res, next) {
  res.render('error', { title: 'Express' });
});

module.exports = router;
