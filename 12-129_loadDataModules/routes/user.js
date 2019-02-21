var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.render('user', { title: '會員專區'});
})
module.exports = router; 