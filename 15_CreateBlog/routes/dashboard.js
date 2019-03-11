var express = require('express');
var router = express.Router();
//stringtags 為可以將Htmp String化
const stringtags = require('striptags');
//moment 可以將時間做格式切換
const moment = require('moment');

var firebaseAdminDb = require('../connections/firebase_admin');

//指定一個Firebase路徑 (categories 文章分類)
const categoriesRef = firebaseAdminDb.ref('/categories/');
//指定一個Firebase路徑 (articles) 建立文章)
const articlesRef = firebaseAdminDb.ref('/articles/');

router.get('/', (req, res) => {
    const messages = req.flash('error');
    res.render('dashboard/index', {
        title: 'Express',
        currentPath: '/',
        hasErrors: messages.length > 0,
    });
});

router.get('/archives', function (req, res, next) {
    //get url ?status val, 如果沒有取得則=public
    const status = req.query.status || 'public';
    //console.log(status);

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
            //這邊就判斷目前是哪一個status 就只塞那一類的article
            if (status === snapshotChild.val().status){
                //將每一筆article data 塞入ary
                articles.push(snapshotChild.val());
            }
        })
        //做反轉排序，因為Firebase是將新資料往下塞，但顯示上要將新的呈現在上
        articles.reverse();
        //console.log(categories, articles);
        res.render('dashboard/archives', {
            articles,
            categories,
            stringtags,
            moment,
            status
        });
    })
});

//Get preview page 建立新的文章 (Detial)
router.get('/article/create', function (req, res, next) {
    
    //顯示　Firebase categories 目前已經新增的分類
    categoriesRef.once('value').then(function(snapshot){
        const categories = snapshot.val();
        //console.log('categories: ', categories);
        //render 至dashboard/article
        res.render('dashboard/article', {
            categories
        });
    })
});

//article創建完成後，再度返回到該頁，但是是Firebase push()出來後的頁面
router.get('/article/:id', function (req, res, next) {
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
        res.render('dashboard/article', {
            //最後將categories 與 該id的article 帶入.ejs
            categories,
            article
        });
    })
});

//Get preview page 建立新的文章分類 (列表區)
router.get('/categories', function (req, res, next) {
    //message = connect-flash暫存 session
    const message = req.flash('info');
    categoriesRef.once('value', function(snapshot){
        const categories = snapshot.val();
        console.log(categories);
        res.render('dashboard/categories', {
            //ES6寫法 key name == value obj name, 可以寫一個name就好
            //ES5 = categories: categories
            //該categories 要res.render去給categories.ejs使用
            categories,
            message,
            //這邊多一個boolean 可以給category.ejs判斷是否要出現這個message
            hasInfo: message.length > 0

        });
    })
});

//建立文章
router.post('/article/create', function(req, res){
    //接收article.ejs User填入的內容 (選擇文章分類、狀態是否為草稿or公開、Article Title&Content)
    console.log(req.body);
    const data = req.body;
    //使用Firebase push() 為該article新增一個在 articles內的ID data
    const articleRef = articlesRef.push();
    //產生的專屬ID Get
    const key = articleRef.key;
    //使用Date.now() Get絕對時間
    const updateTime = Math.floor(Date.now() / 1000);
    //補充data屬性
    data.id = key;
    data.update_time = updateTime;
    console.log('article: ', data);
    
    //將data set至push()產生的位置
    articleRef.set(data).then(function(){
        //轉址
        res.redirect(`/dashboard/article/${key}`);
    })
})

//更新文章
router.post('/article/update/:id', function (req, res) {
    //req.body接收ejs User post過來的form資訊
    //console.log(req.body);
    const data = req.body;
    const id = req.param('id');
    console.log("article/update: ",data);
    //由於是更新，這裡改成使用articlesRef裡面id 然後update(data) 整個覆蓋更新
    articlesRef.child(id).update(data).then(function () {
        //再重新轉址到目前id
        res.redirect(`/dashboard/article/${id}`);
    })
})

//使用Ajax POST傳送過來刪除文章
router.post('/article/delete/:id', function (req, res) {
    const id = req.param('id');
    console.log('delete id: ', id);
    //刪除Firebase articles裡的id data
    articlesRef.child(id).remove();
    req.flash('info', '文章已刪除');
    //回傳給前端Ajax response
    res.send('文章已刪除');
    res.end();
});

//建立新的文章分類 (列表區)
router.post('/categories/create', function(req, res){
    const data = req.body; //使用req.body 會收到Obj格式
    //console.log(data);

    //Firebase使用.push() 會建立一個 專屬ID 所以這個'categoryRef'路徑是指'categoriesRef'內層產生出來的
    const categoryRef = categoriesRef.push();
    //間產生的專屬ID Get
    const key = categoryRef.key;
    //將const data 再增加一項key
    data.id = key;

    //查Firebase是否已有相同路徑
    //orderByChild 抓取該Ref的path(Key)
    //equalTo 比對值 (100%相同，不是模糊比對)
    categoriesRef.orderByChild('path').equalTo(data.path).once('value')
    .then(function(snapshot){
        // !== null代表有該值
        if(snapshot.val() !== null){
            //flash 使用info 這個session 填入value
            req.flash('info', '已有相同的路徑');
            res.redirect('/dashboard/categories');
        }else{
            //將資料寫進Firebase
            categoryRef.set(data).then(function () {
                //轉址至dashboard/categories 避免卡在dashboard/categories/create
                res.redirect('/dashboard/categories');
            })
        }
    })
})

//刪除列表指定的文章分類 (列表區)
//:id 指POST過來的ID 是指Firebase push()產生的ID
router.post('/categories/delete/:id', function (req, res) {
    const id = req.param('id');
    console.log('delete id: ',id);
    //移除該指定ID
    categoriesRef.child(id).remove();
    //使用connect-flash 暫時存一個session在瀏覽器
    req.flash('info', '欄位已刪除');
    //轉址至dashboard/categories 避免卡在dashboard/categories/create
    res.redirect('/dashboard/categories');
});

module.exports = router;