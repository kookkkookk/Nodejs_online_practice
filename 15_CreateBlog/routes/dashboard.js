var express = require('express');
var router = express.Router();

var firebaseAdminDb = require('../connections/firebase_admin');

//指定一個Firebase路徑 (categories 文章分類)
const categoriesRef = firebaseAdminDb.ref('/categories/');
//指定一個Firebase路徑 (articles) 建立文章)
const articlesRef = firebaseAdminDb.ref('/articles/');

router.get('/archives', function (req, res, next) {
    res.render('dashboard/archives', { title: 'Express' });
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
        res.redirect('/dashboard/article/create');
    })
})

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