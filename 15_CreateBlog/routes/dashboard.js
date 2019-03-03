var express = require('express');
var router = express.Router();

var firebaseAdminDb = require('../connections/firebase_admin');

//指定一個Firebase路徑
const categoriesRef = firebaseAdminDb.ref('/categories/');

router.get('/archives', function (req, res, next) {
    res.render('dashboard/archives', { title: 'Express' });
});

router.get('/article', function (req, res, next) {
    res.render('dashboard/article', { title: 'Express' });
});

router.get('/categories', function (req, res, next) {
    categoriesRef.once('value', function(snapshot){
        const categories = snapshot.val();
        console.log(categories);
        res.render('dashboard/categories', {
            //ES6寫法 key name == value obj name, 可以寫一個name就好
            //ES5 = categories: categories
            categories
            //該categories 要res.render去給categories.ejs使用
        });
    })
});
router.post('/categories/create', function(req, res){
    const data = req.body; //使用req.body 會收到Obj格式
    console.log(data);

    //Firebase使用.push() 會建立一個 專屬ID 所以這個'categoryRef'路徑是指'categoriesRef'內層產生出來的
    const categoryRef = categoriesRef.push();
    //間產生的專屬ID Get
    const key = categoryRef.key;
    //將const data 再增加一項key
    data.id = key;

    //將資料寫進Firebase
    categoryRef.set(data).then(function(){
        //轉址至dashboard/categories 避免卡在dashboard/categories/create
        res.redirect('/dashboard/categories');
    })
})

module.exports = router;