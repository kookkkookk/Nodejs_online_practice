//User所有的routes就會寫在 routes/user.js 裡管理

//使用express 裡的 Router()功能
var express = require('express');
var router = express.Router();

//這邊指連線/user/edit-profile,
//因為app.js  app.use('/user', user); 已經指定page > '/user' 了
router.get('/edit-profile', (req, res)=>{
    res.send('profile');
});

//這邊指連線/user/photo
router.get('/photo', (req, res)=>{
    res.send('photo');
});

router.get('/card', (req, res)=>{
    res.send('card');
});

module.exports = router;